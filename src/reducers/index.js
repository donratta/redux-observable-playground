import {SEARCHED_BEERS_LOADING, CANCEL_SEARCH,SEARCHED_BEERS,SEARCHED_BEERS_ERROR, RECEIVED_BEERS, LOAD_STORIES, FETCH_STORIES_FULFILLED } from "../actions";

// const initialState = {
//   users: [
//     'shakyshane',
//     'sindresorhus',
//     'substack'
//   ],
//   current: null,
//   loading: false,
// };

// const initialState = {
//   stories: [],
//   loading: false
// }
const initialState = {
  messages: [],
  beers: [],
  loading: false,
};

// export default function storiesReducer(state = initialState, action) {
//   switch(action.type) {
//     // case FETCH_USER:
//     // return {
//     //   ...state,
//     //   current: null,
//     //   loading: true
//     // };
//     // case FETCH_USER_FULFILLED:
//     //   return {
//     //     ...state,
//     //     current: action.payload,
//     //     loading: false
//     //   };
//     case LOAD_STORIES:
//       return {
//         stories: [],
//         loading: true
//       }
//     case FETCH_STORIES_FULFILLED:
//       return {
//         stories: action.payload,
//         loading: false
//       };
//     default: return state;
//   }
// }

export default function beersReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCHED_BEERS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CANCEL_SEARCH:
      return {
        ...state,
        loading: false,
      };
    case SEARCHED_BEERS:
      return {
        ...state,
        messages: [],
      };
    case SEARCHED_BEERS_ERROR:
      return {
        ...state,
        loading: false,
        messages: [{type: 'error', text: action.payload}]
      };
    case RECEIVED_BEERS:
      return {
        ...state,
        beers: action.payload,
        loading: false,
      };
    default: return state;
  }
}