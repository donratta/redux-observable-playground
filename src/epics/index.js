// import { Observable, of, throwError } from 'rxjs';
// import { combineEpics } from 'redux-observable';
// import "rxjs/add/operator/switchMap";
// import "rxjs/add/observable/of";
// import "rxjs/add/operator/delay";
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/ignoreElements';
// import 'rxjs/add/operator/filter';
// import { map, mergeMap, debounceTime, catchError, tap } from 'rxjs/operators';
// import { ajax } from 'rxjs/ajax';
// import { forkJoin } from 'rxjs';
// import { LOAD_STORIES, FETCH_USER, fetchUserFulfilledAction, fetchStoriesFulfilledAction, SEARCHED_BEERS, receiveBeers, searchBeersError } from '../actions';

// const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
// const url = id =>
//   `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;


// const beers  = `https://api.punkapi.com/v2/beers`;
// const search = (term) => term === 'skull' ? throwError(new Error('Ajax failed')) : `${beers}?beer_name=${encodeURIComponent(term)}`;


// function fetchStoriesEpic(action$) {
//   return action$.ofType(LOAD_STORIES)
//     .switchMap(() => {
//       return (
//         ajax.getJSON(topStories)
//         .pipe(
//           map(ids => ids.slice(0,5)),
//           map(ids => ids.map(url)),
//           map(urls => urls.map(url => ajax.getJSON(url))),
//           mergeMap(reqs => forkJoin(reqs)),
//           map(stories => fetchStoriesFulfilledAction(stories))
//         )
//       );
//     })
// }

// function fetchUserEpic(action$) {
//   return action$.ofType(FETCH_USER)
//     .switchMap(({payload}) => {
//       return ajax.getJSON(`https://api.github.com/users/${payload}`)
//         .pipe(
//           map(user => {
//             return fetchUserFulfilledAction(user);
//           })
//         )
//     })
// }

// function searchBeerEpic(action$) {
//   return action$.ofType(SEARCHED_BEERS)
//     .switchMap(({payload}) => {
//       return ajax.getJSON(search(payload))
//       // .catch(err => of(searchBeersError(err)))
//       .pipe(
//         tap(console.log),
//         map(receiveBeers),
//         catchError(err => searchBeersError(err))
//       )
//     })
// }

// export const rootEpic = combineEpics(searchBeerEpic);

import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  receiveBeers,
  searchBeersError,
  searchBeersLoading,
  SEARCHED_BEERS
} from "../actions/index";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/concat";

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax = term =>
  term === "skull"
    ? Observable.throw(new Error("Ajax failed!"))
    : Observable.ajax.getJSON(search(term));

function searchBeersEpic(action$) {
  return action$
    .ofType(SEARCHED_BEERS)
    .debounceTime(500)
    .filter(action => action.payload !== "")
    .switchMap(({ payload }) => {
      // loading state in UI
      const loading = Observable.of(searchBeersLoading(true));

      // external API call
      const request = ajax(payload)
        .map(receiveBeers)
        .catch(err => {
          return Observable.of(searchBeersError(err));
        });

      return Observable.concat(loading, request);
    });
}

export const rootEpic = combineEpics(searchBeersEpic);
