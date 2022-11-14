import React from 'react';
import LazyLoad from 'react-lazyload';
import './App.css';
import { posts } from './post';

const Loading = () => (
  <div className='post loading'>
    <h5>Loading...</h5>
  </div>
)

const Post = ({ id, title, body } : { id: number, title: string, body: string }) => (
  <div className='post'>
    <LazyLoad
      once={true}
      placeholder={<img src={`https://picsum.photos/id/${id}/200/200`} alt='...' />}
    >
      <div className='post-img'>
        <img src={`https://picsum.photos/id/${id}/200/200`} alt='...' />
      </div>
      <div className='post-body'>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </LazyLoad>
  </div>
);

function App() {
  return (
    <div className="App">
      <h2>LazyLoad demo</h2>
      <div className='post-container'>
        {posts.map(post => (
          <LazyLoad height={100} offset={[-100, 100]} key={post.id} placeholder={<Loading/>}>
            <Post key={post.id} {...post} />
          </LazyLoad>
        ))}
      </div>
    </div>
  );
}

export default App;
