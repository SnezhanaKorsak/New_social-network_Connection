import React from 'react';
import s from "./ProfileCover.module.css";
import findAvatar from '../../../assets/images/nouser.png'

type PropsType = {
    userAvatar: string | undefined
    userId: number | undefined
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const ProfileCover: React.FC<PropsType> = ({
                                                      userAvatar,
                                                      isOwner,
                                                      savePhoto
                                                  }) => {

    const onLoadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files)
            savePhoto(e.target.files[0])
        }
    }


    return <div className={s.cover}>
        <div className={s.avatar}>
            <img
                src={userAvatar || findAvatar}
                alt='avatar'
            />
            {isOwner && <div className={s.overlay}>
                <input id="inputFile" type="file" className={s.inputFile} onChange={onLoadPhoto}/>
                <label htmlFor="inputFile" className={s.inputFileButton}>Update the photo</label>
            </div>}
        </div>
    </div>
}