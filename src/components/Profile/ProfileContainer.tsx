import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, ProfileType, savePhotoTC, updateStatusTC} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile () {
        let userId = this.props.match.params.userId
        if (!userId) userId = '20572'
        this.props.getUserProfileTC(userId)
        this.props.getUserStatusTC(userId)
    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render(): React.ReactNode {
        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        isOwner={!this.props.match.params.userId}
                        updateStatus={this.props.updateStatusTC}
                        savePhoto={this.props.savePhotoTC}
        />
    }
}

type mapStatePropsType = {
    profile: ProfileType | null
    isAuth: boolean
    status: string
}
type mapDispatchPropsType = {
    getUserProfileTC: (userId: string) => void
    getUserStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhotoTC: (file: File) => void
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileTC, getUserStatusTC, updateStatusTC, savePhotoTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)