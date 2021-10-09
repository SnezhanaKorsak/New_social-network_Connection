import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {Messages} from "./components/Messages/Messages";
import {BrowserRouter, Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import {DialogsType, PostsType, UsersType} from "./index";

type AppType = {
    posts: PostsType[]
    users: UsersType[]
    dialogs: DialogsType[]
}

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile posts={props.posts}/>}/>
                    <Route path='/messages' render={() => <Messages users={props.users} dialogs={props.dialogs}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/video' render={() => <Video/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
