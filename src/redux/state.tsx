import React from 'react';
import {renderEntireTree} from "../render";

export type PostType = {
    id: number
    message: string
    likecount: number
}
export type UsersType = {
    id: number
    name: string
}
export type DialogsType = {
    id: number
    message: string
}

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
export type MessagePageType = {
    users: UsersType[]
    dialogs: DialogsType[]
}
export type SideBarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    messagePage: MessagePageType
    sideBar: SideBarType
}

export const state: RootStateType = {
    profilePage: {
        posts: [
            {
                id: 1,
                message: "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
                likecount: 15
            },
            {
                id: 2,
                message: "Success is the ability to go from failure to failure without losing your enthusiasm.",
                likecount: 20
            }
        ],
        newPostText: ''
    },
    messagePage: {
        users: [
            {id: 1, name: "Linda Logan"},
            {id: 2, name: "Sophia Lee"},
            {id: 3, name: "John Doe"},
            {id: 4, name: "Anna Young"},
        ],
        dialogs: [
            {id: 1, message: "Hi honey, how are you doing???? Long time no see. Where have you been?"},
            {id: 2, message: "I have been on vacation"},
            {id: 3, message: "It was a great time for me. we had a lot of fun"},
            {id: 4, message: "That's cool. I wish I were you"}
        ]
    },
    sideBar: {}
}

export const addPost = (postText: string) => {
    const newPost: PostType = {
        id: new Date().getTime(),
        message: postText,
        likecount: 0
    }
    state.profilePage.posts.push(newPost)
    renderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    renderEntireTree(state)
}