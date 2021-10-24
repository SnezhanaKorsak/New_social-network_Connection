import React, {ChangeEvent} from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import {ActionsType,MessagePageType} from "../../redux/state";
import {addMessageAC, onMessageChangeAC} from '../../redux/messageReducer';


type MessagesPropsType = {
    messagePage: MessagePageType
    message: string
    dispatch: (action: ActionsType) => void
}

export function Messages(props: MessagesPropsType) {

    const addMessage = () => {
        props.dispatch(addMessageAC(props.message))
        props.dispatch(onMessageChangeAC(''))
    }
    const updateMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(onMessageChangeAC(e.currentTarget.value))
    }

    let usersElement = props.messagePage.users.map(u => <UserItem key={u.id} id={u.id} name={u.name}/> );
    let dialogElement = props.messagePage.dialogs.map(d => <DialogItem key={d.id} message={d.message}/> );

    return (


        <div className={s.messages}>
            <div className={s.users}>
                {usersElement}
            </div>

            <div className={s.dialogs}>
                {dialogElement}
                <textarea value={props.message} onChange={updateMessageText}/>
                <button onClick={addMessage}>Add message</button>
            </div>

        </div>
    )
}