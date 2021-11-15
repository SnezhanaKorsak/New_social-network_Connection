import React from 'react';
import s from "./ProfileCover.module.css";
import findAvatar from '../../../assets/images/nouser.png'
import myAvatar from '../../../assets/images/myAvatar.jpg'

type PropsType = {
    userAvatar: string | undefined
    userId: number | undefined
}

export const ProfileCover: React.FC<PropsType> = ({userAvatar, userId}) => {
    return <div className={s.cover}>
        <div className={s.avatar}>
            <img
                src={userId === 20572 ? myAvatar : userAvatar ? userAvatar : findAvatar}
                alt='avatar'
            />
        </div>
    </div>
}