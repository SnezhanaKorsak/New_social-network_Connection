import React from 'react';
import {addPostAC, onPostChangeAC, profileReducer} from "./profileReducer";
import {addMessageAC, messageReducer, onMessageChangeAC} from "./messageReducer";
import {sideBarReducer} from "./sideBarReducer";

export type PostType = {
    id: number
    message: string
    likeCount: number
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
    newMessageText: string
}
export type SideBarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    messagePage: MessagePageType
    sideBar: SideBarType
}

export type ActionsType =
    ReturnType<typeof addPostAC> | ReturnType<typeof onPostChangeAC> |
    ReturnType<typeof addMessageAC> | ReturnType<typeof onMessageChangeAC>

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void
}


const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
                    likeCount: 15
                },
                {
                    id: 2,
                    message: "Success is the ability to go from failure to failure without losing your enthusiasm.",
                    likeCount: 20
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
            ],
            newMessageText: ''
        },
        sideBar: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagePage = messageReducer(this._state.messagePage, action)
        this._state.sideBar = sideBarReducer(this._state.sideBar, action)
        this._callSubscriber()
    },
}



