import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
//Allows you to link to another url
import {Link} from 'react-router'


class PostsIndex extends Component {
  //componentWillMount: react will call this automatically whenever our component is about to be rendered to the DOM for the first time!
  //It will not be called on subsequent re-renders
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts(){
    return this.props.posts.map((post) => {
      return (
        <li className='list-group-item' key={post.id}>
          <Link to={"posts/"+ post.id}>
            <span className='pull-xs-right'> {post.categories} </span>
            <strong>{post.title} </strong>
          </Link>
        </li>
      )
    })
  }

  render(){
    return (
      <div>
        <div className='text-xs-right'>
          <Link to="/posts/new" className='btn btn-primary'>
            Add a post
          </Link>
        </div>
        <h2>Posts</h2>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts.all
  }
}


export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
