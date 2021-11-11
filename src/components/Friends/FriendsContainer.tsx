import React from "react";
import {connect} from "react-redux";
import {Friends} from "./Friends";
import {AppStateType} from "../../redux/redux-store";
import {followAC, FriendType, initialStateType, setFriendsAC, unfollowAC} from "../../redux/friendsReducer";
import {Dispatch} from "redux";
import axios from "axios";

type PropsType = mapStatePropsType & mapDispatchPropsType
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

class FriendsContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=4`)
            .then(response => {
                this.props.setFriends(response.data.items)
            })
    }

    render(): React.ReactNode {
        return <Friends friendsPage={this.props.friendsPage}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        setFriends={this.props.setFriends} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)