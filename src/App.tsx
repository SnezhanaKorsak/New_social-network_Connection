import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {Messages} from "./components/Messages/Messages";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import {ActionsType, StoreType} from "./redux/state";


type AppType = {
    store: StoreType
    dispatch: (action: ActionsType) => void
}

export const PATH = {
    PROFILE: '/profile',
    MESSAGES: '/messages',
    MUSIC: '/music',
    VIDEO: '/video'
}

function App(props: AppType) {
    const state = props.store.getState()

    return (
        <HashRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                        <Route path={PATH.PROFILE} render={() => <Profile profilePage={state.profilePage}
                                                                          dispatch={props.dispatch}
                        />}/>
                        <Route path={PATH.MESSAGES} render={() => <Messages messagePage={state.messagePage}
                                                                            message={state.messagePage.newMessageText}
                                                                            dispatch={props.dispatch}
                        />}/>
                        <Route path={PATH.MUSIC} render={() => <Music/>}/>
                        <Route path={PATH.VIDEO} render={() => <Video/>}/>
                    </Switch>

                </div>
            </div>
        </HashRouter>
    );
}

export default App;
