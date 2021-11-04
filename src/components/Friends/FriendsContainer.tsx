import React from "react";
import {connect} from "react-redux";
import {Friends} from "./Friends";
import {AppStateType} from "../../redux/redux-store";
import {followAC, FriendType, initialStateType, setFriendsAC, unfollowAC} from "../../redux/friendsReducer";
import {Dispatch} from "redux";

type mapStatePropsType = {
    friendsPage: initialStateType
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFriends: (friends: Array<FriendType>) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        friendsPage: state.friendsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setFriends: (friends: Array<FriendType>) => {
            dispatch(setFriendsAC(friends))
        }
    }
}

export const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)