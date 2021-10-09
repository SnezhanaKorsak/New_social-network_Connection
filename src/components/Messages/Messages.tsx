import React from 'react';
import s from './Messages.module.css'
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogsType, UsersType} from "../../index";


type MessagesPropsType = {
    users: UsersType[]
    dialogs: DialogsType[]
}

export function Messages(props: MessagesPropsType) {

    let usersElement = props.users.map( u => <UserItem id={u.id} name={u.name}/> );
    let dialogElement = props.dialogs.map(d => <DialogItem message={d.message}/> );

    return (


        <div className={s.messages}>
            <div className={s.users}>
                {usersElement}
            </div>

            <div className={s.dialogs}>
                {dialogElement}
            </div>

        </div>
    )
}