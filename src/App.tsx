import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {Messages} from "./components/Messages/Messages";
import {BrowserRouter, Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import {ActionSType, StoreType} from "./redux/state";


type AppType = {
    store: StoreType
    dispatch: (action: ActionSType) => void
}

function App(props: AppType) {
    const state = props.store.getState()

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile profilePage={state.profilePage}
                                                                  dispatch={props.dispatch}
                    />}/>
                    <Route path='/messages' render={() => <Messages messagePage={state.messagePage}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/video' render={() => <Video/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
