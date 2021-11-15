import React, {ChangeEvent} from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import { MessagePropsType } from './MessagesContainer';
import {Redirect} from "react-router-dom";
import {PATH} from "../../App";


export function Messages(props: MessagePropsType) {

    const addMessage = () => {
        props.addMessage(props.messagePage.newMessageText)
        props.onMessageChange('')
    }
    const updateMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onMessageChange(e.currentTarget.value)
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
                <textarea value={props.messagePage.newMessageText} onChange={updateMessageText}/>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    )
}