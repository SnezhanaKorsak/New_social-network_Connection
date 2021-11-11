import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import {MessagesContainer} from "./components/Messages/MessagesContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";


type AppType = {
  /*  store: StoreType*/
}

export const PATH = {
    PROFILE: '/profile',
    MESSAGES: '/messages',
    FRIENDS: '/friends',
    MUSIC: '/music',
    VIDEO: '/video'
}

function App(props: AppType) {
   /* const state = props.store.getState()*/

    return (
        <HashRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                        <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                        <Route path={PATH.MESSAGES} render={() => <MessagesContainer/>}/>
                        <Route path={PATH.FRIENDS} render={() => <FriendsContainer/>}/>
                        <Route path={PATH.MUSIC} render={() => <Music/>}/>
                        <Route path={PATH.VIDEO} render={() => <Video/>}/>
                    </Switch>

                </div>
            </div>
        </HashRouter>
    );
}

export default App;
