import React from 'react';
import s from './UserItem.module.css'
import {NavLink} from "react-router-dom";

type UserItemPropsType = {
    id: number
    name: string
}

export function UserItem(props: UserItemPropsType) {
    return ( <div>
                <div className={s.userItem}>
                    <NavLink to={'/messages/' + props.id}>{props.name}</NavLink>
                </div>
        </div>
    )
}