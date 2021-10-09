import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export type PostsType = {
    id: number
    message: string
    likecount: number
}
export type UsersType = {
    id: number
    name: string
}
export type DialogsType = {
    id: number
    message: string
}

const postsData = [
    {
        id: 1,
        message: "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
        likecount: 15
    },
    {
        id: 2,
        message: "Success is the ability to go from failure to failure without losing your enthusiasm.",
        likecount: 20
    }
]
const usersData = [
    {id: 1, name: "Linda Logan"},
    {id: 2, name: "Sophia Lee"},
    {id: 3, name: "John Doe"},
    {id: 4, name: "Anna Young"},
]
const dialogsData = [
    {id: 1, message: "Hi honey, how are you doing???? Long time no see. Where have you been?"},
    {id: 2, message: "I have been on vacation"},
    {id: 3, message: "It was a great time for me. we had a lot of fun"},
    {id: 4, message: "That's cool. I wish I were you"},
]

ReactDOM.render(
  <React.StrictMode>
    <App posts={postsData} users={usersData} dialogs={dialogsData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
