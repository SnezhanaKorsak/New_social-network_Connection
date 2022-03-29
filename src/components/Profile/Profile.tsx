import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePostContainer} from "./ProfilePosts/NewPost/ProfilePostContainer";
import {ProfileType} from "../../redux/profileReducer";


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}

export const Profile: React.FC<ProfilePropsType> = ({
                                                        profile,
                                                        status,
                                                        isOwner,
                                                        updateStatus,
                                                        savePhoto
                                                    }) => {

    return <div className={s.content}>
        <ProfileCover userAvatar={profile?.photos.small}
                      userId={profile?.userId}
                      isOwner={isOwner}
                      savePhoto={savePhoto}/>
        <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} />
        <ProfilePostContainer/>
    </div>

}