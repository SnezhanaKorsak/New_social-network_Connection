import React, {ChangeEvent} from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import { MessagePageType } from '../../redux/messageReducer';


type MessagesPropsType = {
    messagePage: MessagePageType
    addMessage: (messageText: string) => void
    updateMessageText: (newText: string) => void
}

export function Messages(props: MessagesPropsType) {

    const addMessage = () => {
        props.addMessage(props.messagePage.newMessageText)
        props.updateMessageText('')
    }
    const updateMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessageText(e.currentTarget.value)
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