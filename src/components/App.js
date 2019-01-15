import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
let baseURL = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );

   
  }

  
  componentDidMount() {
    axios.get(`${baseURL}/posts`).then( results =>{
      this.setState({posts:results.data})
    })
  }

  updatePost(id, text) {
    axios.put(`${baseURL}/posts?id=${id}`, {text}).then(results =>{
      this.setState({posts: results.data})
    });
  }

  deletePost(id) {
    axios.delete(`${baseURL}/posts?id=${id}`).then( results =>{
      this.setState({posts: results.data})
    })

  }

  createPost(text) {
    axios.post(`${baseURL}/posts`, {text}).then( results =>{
      this.setState({post: results.data})
    });
  }

  render() {
    const { posts } = this.state;
    const createPostFn = posts.map((e,i) =>{
      return <Post key = {e.id} text = {e.text} date = {e.date} id={e.id} 
      updatePostFn = {this.updatePost} deletePostFn = {this.deletePost}/>
    })
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn = {this.createPost}/>
          {createPostFn}

        </section>

      </div>
    );
  }
}

export default App;
