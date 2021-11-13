import React from 'react';
import s from "./ProfileCover.module.css";
import findAvatar from '../../../assets/images/nouser.png'

type PropsType = {
    userAvatar: string | undefined
}

export const ProfileCover: React.FC<PropsType> = ({userAvatar}) => {
    return <div className={s.cover}>
        <div className={s.avatar}>
            <img
                src={userAvatar ? userAvatar : findAvatar}
                alt='avatar'
            />
        </div>
    </div>
}