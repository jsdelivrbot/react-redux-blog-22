import { FETCH_POSTS, FETCH_POST } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

// With axios and redux promises, the data returned
// from API calls will be available at action.payload.data
//
// In redux we always return a new object
//
// { ...state, all: action.payload.data } this syntax means:
// take whatever the state is and ADD rest on
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, all: action.payload.data }
    case FETCH_POST:
      return { ...state, post: action.payload.data }
    default:
      return state;
  }
}
