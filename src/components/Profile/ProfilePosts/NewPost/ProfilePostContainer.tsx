import React from 'react';
import {addPostAC, onPostChangeAC} from "../../../../redux/profileReducer";
import {ProfileNewPost} from "./ProfileNewPost";
import {ProfileAllPost} from "../AllPosts/ProfileAllPost";
import {StoreContext} from "../../../../StoreContext";

type ProfilePostContainerType = {
    /* store: StoreType*/
}


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
}