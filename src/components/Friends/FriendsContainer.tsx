import React from "react";
import {connect} from "react-redux";
import {Friends} from "./Friends";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    followTC,
    FriendType,
    initialStateType,
    setFriends,
    toggleIsFollowingProgress,
    unfollow, unfollowTC
} from "../../redux/friendsReducer";


type PropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    friendsPage: initialStateType
    isFetching: boolean
    followingInProgress: number[]
}
type mapDispatchPropsType = {
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        friendsPage: state.friendsPage,
        isFetching: state.friendsPage.isFetching,
        followingInProgress: state.friendsPage.followingInProgress,
    }
}

class FriendsContainer extends React.Component<PropsType> {

    render(): React.ReactNode {
        return (
            <Friends friendsPage={this.props.friendsPage}
                     followingInProgress={this.props.followingInProgress}
                     isFetching={this.props.isFetching}
                     followTC={this.props.followTC}
                     unfollowTC={this.props.unfollowTC}
            />
        )
    }
}

export default connect(mapStateToProps, {followTC,unfollowTC})(FriendsContainer)