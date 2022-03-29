import React, {Suspense} from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {initializeApp} from "./redux/appReducer";
import {connect, Provider} from "react-redux";
import {AppStateType, store} from "./redux/redux-store";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Preloader} from "./common/Preloader/Preloader";
import {Navbar} from "./components/NavBar/Navbar";
import './App.css';


const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"))
const Video = React.lazy(() => import("./components/Video/Video"))
const Music = React.lazy(() => import("./components/Music/Music"))

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
        if (!this.props.initialized) return <Preloader/>

        return (

            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                            <Route path={PATH.PROFILE + ':userId?'} render={() => <ProfileContainer/>}/>
                            <Route path={PATH.MESSAGES} render={() => <MessagesContainer/>}/>
                            <Route path={PATH.FRIENDS} render={() => <FriendsContainer/>}/>
                            <Route path={PATH.MUSIC} render={() => <Music/>}/>
                            <Route path={PATH.VIDEO} render={() => <Video/>}/>
                        </Switch>
                    </Suspense>
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