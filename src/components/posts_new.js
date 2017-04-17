import React, { Component, PropTypes } from 'react';
// reduxForm is really similar to the redux connect function
import { reduxForm } from 'redux-form';

import { Link } from 'react-router'

// this is the action creator AKA submit handler for the form
import { createPost } from '../actions/index';

class PostsNew extends Component {
  // context is information that is passed from parent to child implicitly.
  // It is how we will pass props from react-router to this component.
  // however do not abuse it, mainly apply it to react-router.
  static contextTypes = {
    router: PropTypes.object
  }

  // .then can be called because the createPost actioncreator's payload returns a promise.
  // we want to navigate back when the blog post has been created.
  onSubmit(props) {
    this.props.createPost(props).then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    // this function is provided by the connection to reduxForm
    // syntax using fancy es6 features
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // check out how redux-form handles the fields
    // console.log(title);

    // {...title} is a destructuring of the object. It breaks it down to its separate keys and
    // values and passes them on to the input. This is like writing the props onchange, onblur , etc etc
    // onto the imput element itself.
    // handleSubmit needs to be passed a handler (an action creator!)
    //
    // 'touched' prop comes from redux-form
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <h3>Create a New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}` }>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : ''}` }>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    )
  }
}

// validate handles the error object, validate will also prevent a form from being submitted.
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

// connect: first arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
// reduxForm works the same way as connect. it takes 1 additional argument
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
