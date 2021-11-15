import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePostContainer} from "./ProfilePosts/NewPost/ProfilePostContainer";
import {ProfileType} from "../../redux/profileReducer";


type ProfilePropsType = {
    profile: ProfileType | null

}

export const Profile: React.FC<ProfilePropsType > = ({profile}) => {

    return <div className={s.content}>
        <ProfileCover userAvatar = {profile?.photos.small} userId={profile?.userId}/>
        <ProfileInfo profile = {profile}/>
        <ProfilePostContainer />
    </div>

}