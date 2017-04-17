import { combineReducers } from 'redux';

// using redux-form HOC, docs at http://redux-form.com redux-form@4.1.3
// this is ES6 for "import redux-form, grab the reducer property off of it, and then create variable with it named formReducer
import { reducer as formReducer } from 'redux-form';

import PostsReducer from './reducer_posts';


// redux form pulls the form values over to the application level state
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
