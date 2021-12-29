import React  from 'react';
import {addMessage, MessagePageType, onMessageChange} from '../../redux/messageReducer';
import {Messages} from "./Messages";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { compose } from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



type mapStatePropsType = {
    messagePage: MessagePageType
    isAuth: boolean
}
type mapDispatchPropsType = {
    addMessage: (messageText: string) => void
    onMessageChange: (newText: string) => void
}
export type MessagePropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        messagePage: state.messagePage,
        isAuth: state.auth.isAuth
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, {addMessage,onMessageChange }),
    //withAuthRedirect
    )(Messages)