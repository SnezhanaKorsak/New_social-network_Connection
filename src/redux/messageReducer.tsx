import React from "react";
import {ActionsType, DialogsType, MessagePageType} from "./store";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

const initialState: MessagePageType  = {
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
}

export const messageReducer = (state = initialState, action: ActionsType): MessagePageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: DialogsType = {
                id: new Date().getTime(),
                message: action.messageText,
            }
            state.dialogs.push(newMessage)

            return state;
        case UPDATE_NEW_MESSAGE:
            state.newMessageText = action.newText

            return state;
        default:
            return state
    }

}

export const addMessageAC = (messageText: string) => {

    return {
        type: ADD_MESSAGE,
        messageText: messageText
    } as const
}
export const onMessageChangeAC = (newText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE,
        newText: newText
    } as const
}