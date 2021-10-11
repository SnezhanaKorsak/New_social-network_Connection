import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {Messages} from "./components/Messages/Messages";
import {BrowserRouter, Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import {RootStateType} from "./redux/state";


type AppType = {
    state: RootStateType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                                  addPost={props.addPost}
                                                                  updateNewPostText={props.updateNewPostText}
                    />}/>
                    <Route path='/messages' render={() => <Messages messagePage={props.state.messagePage}/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/video' render={() => <Video/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
