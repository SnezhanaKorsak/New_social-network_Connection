import React from 'react';
import s from './Messages.module.css'
import {NavLink} from "react-router-dom";
import {UserItem} from "./UserItem/UserItem";
import {DialogItem} from "./DialogItem/DialogItem";

type MessagesPropsType = {}

export function Messages(props: MessagesPropsType) {
    return (
        <div className={s.messages}>
            <div className={s.users}>
                <UserItem id={1} name={"Linda Logan"}/>
                <UserItem id={2} name={"Sophia Lee"}/>
                <UserItem id={3} name={"John Doe"}/>
                <UserItem id={4} name={"Anna Young"}/>
            </div>

            <div className={s.dialogs}>
                <DialogItem message={"Hi honey, how are you doing???? Long time no see. Where have you been?"}/>
                <DialogItem message={"I have been on vacation"}/>
                <DialogItem message={"It was a great time for me. we had a lot of fun"}/>
                <DialogItem message={"That's cool. I wish I were you"}/>
            </div>

        </div>
    )
}