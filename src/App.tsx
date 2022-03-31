import React, {Suspense} from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {initializeApp, setRootError} from "./redux/appReducer";
import {connect, Provider} from "react-redux";
import {AppStateType, store} from "./redux/redux-store";
import MessagesContainer from "./components/Messages/MessagesContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Preloader} from "./common/Preloader/Preloader";
import {Navbar} from "./components/NavBar/Navbar";
import Login from "./components/Login/Login";
import Error404 from "./common/error404/Error404";
import FriendsContainer from "./components/Friends/FriendsContainer";
import {ErrorSnackBar} from "./common/ErrorSnackBar/ErrorSnackBar";
import './App.css';


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
    error: string | null
    initializeApp: () => void
    setRootError: (error: string | null) => void
}

class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
        const errorMessage = event.reason.toString().slice(6)
        this.props.setRootError(errorMessage)
    }

    componentDidMount(): void {
        this.props.initializeApp()

        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount(): void {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (

            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>

                {this.props.error && <ErrorSnackBar error={this.props.error} setError={this.props.setRootError}/>}

                <div className="app-wrapper-content">
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route path='/' exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                            <Route path={PATH.PROFILE + ':userId?'} render={() => <ProfileContainer/>}/>
                            <Route path={PATH.MESSAGES} render={() => <MessagesContainer/>}/>
                            <Route path={PATH.FRIENDS} render={() => <FriendsContainer/>}/>
                            <Route path={PATH.MUSIC} render={() => <Music/>}/>
                            <Route path={PATH.VIDEO} render={() => <Video/>}/>
                            <Route path={PATH.LOGIN} render={() => <Login/>}/>

                            <Route render={() => <Error404/>}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>

        );
    }
}

type mapStatePropsType = {
    initialized: boolean;
    error: string | null;
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        initialized: state.app.initialized,
        error: state.app.rootError,
    }
}

const AppContainer = connect(mapStateToProps, {initializeApp, setRootError})(App)

const MainApp = () => {

    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp;