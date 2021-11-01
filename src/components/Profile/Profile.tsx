import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePostContainer} from "./ProfilePosts/NewPost/ProfilePostContainer";


type ProfileType = {
 /*  store: StoreType*/
}

export function Profile(props: ProfileType) {

    return <div className={s.content}>
        <ProfileCover/>
        <ProfileInfo/>
        <ProfilePostContainer />

    </div>

}