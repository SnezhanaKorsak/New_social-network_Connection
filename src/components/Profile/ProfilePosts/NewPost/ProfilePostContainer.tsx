import {profileActions, ProfilePageType} from "../../../../redux/profileReducer";
import {connect} from "react-redux";
import {ProfilePosts} from "../ProfilePosts";
import {AppStateType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";


type mapStatePropsType = {
    profilePage: ProfilePageType
}
type mapDispatchPropsType = {
    addPost: (postText: string) => void
    onPostChange: (newText: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addPost: (postText: string) => {
            dispatch(profileActions.addPostAC(postText))
        },
        onPostChange: (newText: string) => {
            dispatch(profileActions.onPostChangeAC(newText))
        }
    }
}


export const ProfilePostContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)