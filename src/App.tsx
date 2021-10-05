import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/NavBar/Navbar";
import {Messages} from "./components/Messages/Messages";
import {BrowserRouter, Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/profile' component={Profile}/>
                    <Route path='/messages' component={Messages}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/video' component={Video}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
