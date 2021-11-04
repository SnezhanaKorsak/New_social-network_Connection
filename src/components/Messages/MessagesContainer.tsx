import React, {ChangeEvent} from 'react';
import {addMessageAC, MessagePageType, onMessageChangeAC} from '../../redux/messageReducer';
import {Messages} from "./Messages";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";


type mapStatePropsType = {
    messagePage: MessagePageType
}
type mapDispatchPropsType = {
    addMessage: (messageText: string) => void
    updateMessageText: (newText: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        messagePage: state.messagePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addMessage: (messageText: string) => {
            dispatch(addMessageAC(messageText))
        },
        updateMessageText: (newText: string) => {
            dispatch(onMessageChangeAC(newText))
        }
    }
}

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)