import React from "react";
import {ActionsType, DialogsType, MessagePageType} from "./state";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

export const messageReducer = (state: MessagePageType, action: ActionsType): MessagePageType => {
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