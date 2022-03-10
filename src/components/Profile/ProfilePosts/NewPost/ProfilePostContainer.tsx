import {addPostAC, onPostChangeAC, ProfilePageType} from "../../../../redux/profileReducer";
import {connect} from "react-redux";
import {ProfilePosts} from "../ProfilePosts";
import {AppStateType} from "../../../../redux/redux-store";
import {Dispatch} from "redux";


/*
export function ProfilePostContainer(props: ProfilePostContainerType) {

    return (

        <StoreContext.Consumer>
            {(store) => {

                const state = store.getState()

                const addPost = (postText: string) => {
                    store.dispatch(addPostAC(postText))
                   store.dispatch(onPostChangeAC(''))
                }

                const onPostChange = (newText: string) => {
                    store.dispatch(onPostChangeAC(newText))
                }

                return (
                    <>
                        <ProfileNewPost message={state.profilePage.newPostText}
                                        addPost={addPost}
                                        onPostChange={onPostChange}
                        />
                        <ProfileAllPost posts={state.profilePage.posts}/>

                    </>
                )
            }}
        </StoreContext.Consumer>


    )
}*/

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
            dispatch(addPostAC(postText))
        },
        onPostChange: (newText: string) => {
            dispatch(onPostChangeAC(newText))
        }
    }
}


export const ProfilePostContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)