import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePostContainer} from "./ProfilePosts/NewPost/ProfilePostContainer";
import {ProfileType} from "../../redux/profileReducer";


type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<ProfilePropsType> = ({
                                                        profile,
                                                        status,
                                                        updateStatus
                                                    }) => {

    return <div className={s.content}>
        <ProfileCover userAvatar={profile?.photos.small} userId={profile?.userId}/>
        <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
        <ProfilePostContainer/>
    </div>

}