import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {Video} from "./components/Video/Video";
import MessagesContainer from "./components/Messages/MessagesContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/NavBar/NavbarContainer";
import {initializeApp} from "./redux/appReducer";
import {connect, Provider} from "react-redux";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./common/Preloader/Preloader";


export const PATH = {
    PROFILE: '/profile/',
    MESSAGES: '/messages/',
    FRIENDS: '/friends/',
    MUSIC: '/music/',
    VIDEO: '/video/',
    LOGIN: '/login/',
}

type AppPropsType = {
    initialized: boolean
    initializeApp: () => void
}

class App extends React.Component<AppPropsType> {
    componentDidMount(): void {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized) return <Preloader/>

        return (

                <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                            <Route path={PATH.PROFILE + ':userId?'} render={() => <ProfileContainer/>}/>
                            <Route path={PATH.MESSAGES} render={() => <MessagesContainer/>}/>
                            <Route path={PATH.FRIENDS} render={() => <FriendsContainer/>}/>
                            <Route path={PATH.MUSIC} render={() => <Music/>}/>
                            <Route path={PATH.VIDEO} render={() => <Video/>}/>
                            <Route path={PATH.LOGIN} render={() => <Login/>}/>
                        </Switch>

                    </div>
                </div>

        );
    }
}

type mapStatePropsType = {
    initialized: boolean
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}

const AppContainer = connect(mapStateToProps, {initializeApp})(App)

const MainApp = () => {

    return <HashRouter>
    <Provider store={store}>
        <AppContainer/>
    </Provider>
    </HashRouter>
}

export default MainApp;