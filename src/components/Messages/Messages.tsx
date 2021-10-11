import React from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessagePageType} from "../../redux/state";


type MessagesPropsType = {
    messagePage: MessagePageType
}

export function Messages(props: MessagesPropsType) {
    let newMessageElement = React.createRef<HTMLTextAreaElement>()
    const addMessage = () => {
        alert(newMessageElement.current?.value)
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
                <textarea ref={newMessageElement}/>
                <button onClick={addMessage}>Add message</button>
            </div>

        </div>
    )
}