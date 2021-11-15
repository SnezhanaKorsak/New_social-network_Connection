import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import MessagesContainer from "./components/Messages/MessagesContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/NavBar/NavbarContainer";


export const PATH = {
    PROFILE: '/profile/',
    MESSAGES: '/messages/',
    FRIENDS: '/friends/',
    MUSIC: '/music/',
    VIDEO: '/video/',
    LOGIN: '/login/',
}

function App() {

    return (
        <HashRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer />
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE + '20572'}/>}/>

                        <Route path={PATH.PROFILE + ':userId'} render={() => <ProfileContainer/>}/>
                        <Route path={PATH.MESSAGES} render={() => <MessagesContainer/>}/>
                        <Route path={PATH.FRIENDS} render={() => <FriendsContainer/>}/>
                        <Route path={PATH.MUSIC} render={() => <Music/>}/>
                        <Route path={PATH.VIDEO} render={() => <Video/>}/>
                        <Route path={PATH.LOGIN} render={() => <Login/>}/>
                    </Switch>

                </div>
            </div>
        </HashRouter>
    );
}

export default App;
