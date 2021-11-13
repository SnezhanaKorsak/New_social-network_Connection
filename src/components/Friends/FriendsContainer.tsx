import React from "react";
import {connect} from "react-redux";
import {Friends} from "./Friends";
import {AppStateType} from "../../redux/redux-store";
import {follow, FriendType, initialStateType, setFriends, unfollow} from "../../redux/friendsReducer";


type PropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    friendsPage: initialStateType
    isFetching: boolean
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFriends: (friends: Array<FriendType>) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        friendsPage: state.friendsPage,
        isFetching: state.friendsPage.isFetching
    }
}

class FriendsContainer extends React.Component<PropsType> {

    render(): React.ReactNode {
        return (
            <Friends friendsPage={this.props.friendsPage}
                     follow={this.props.follow}
                     unfollow={this.props.unfollow}
                     isFetching={this.props.isFetching}/>
        )
    }
}

export default connect(mapStateToProps, {follow, unfollow, setFriends})(FriendsContainer)