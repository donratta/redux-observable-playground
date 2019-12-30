export const LOAD_STORIES = 'LOAD_STORIES';
export const CLEAR_STORIES = 'CLEAR_STORIES';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_STORIES_FULFILLED = 'FETCH_STORIES_FULFILLED';
export const SEARCHED_BEERS_LOADING = 'SEARCHED_BEERS_LOADING';
export const SEARCHED_BEERS_ERROR = 'SEARCHED_BEERS_ERROR';
export const SEARCHED_BEERS = 'SEARCHED_BEERS';
export const RECEIVED_BEERS = 'RECEIVED_BEERS';
export const CANCEL_SEARCH = 'CANCEL_SEARCH';

export function fetchUserAction(login) {
  return {
    type: FETCH_USER,
    payload: login
  };
}

export function fetchUserFulfilledAction(user) {
  return {
    type: FETCH_USER_FULFILLED,
    payload: user
  };
}

export function fetchStories() {
  return {
    type: LOAD_STORIES
  }
}

export function fetchStoriesFulfilledAction(stories) {
  return {
    type: FETCH_STORIES_FULFILLED,
    payload: stories
  }
}

export function cancelSearch() {
  return {
    type: CANCEL_SEARCH
  }
}

export function searchBeersError(err) {
  return {
    type: SEARCHED_BEERS_ERROR,
    payload: err.message
  }
}

export function searchBeersLoading(loading) {
  return {
    type: SEARCHED_BEERS_LOADING,
    payload: loading
  }
}

export function searchBeers(query) {
  return {
    type: SEARCHED_BEERS,
    payload: query
  }
}

export function receiveBeers(beers) {
  return {
    type: RECEIVED_BEERS,
    payload: beers
  }
}