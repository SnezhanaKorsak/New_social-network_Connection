import React from "react";
import {ActionsType, PostType, ProfilePageType} from "./state";


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = "UPDATE-NEW-POST";

export const profileReducer = (state: ProfilePageType, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likeCount: 0
            }
            state.posts.push(newPost)
            return state;
       case UPDATE_NEW_POST:
            state.newPostText = action.newText
            return state;
        default:
            return state
    }
}

export const addPostAC = (postText: string) => {

    return {
        type: ADD_POST,
        postText: postText
    } as const
}

export const onPostChangeAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST,
        newText: newText
    } as const
}