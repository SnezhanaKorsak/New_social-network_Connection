import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileNewPost} from "./ProfilePosts/NewPost/ProfileNewPost";
import {ProfileAllPost} from "./ProfilePosts/AllPosts/ProfileAllPost";
import {ProfilePageType} from "../../redux/state";


type ProfileType = {
    profilePage: ProfilePageType
    addPost: (postText: string) => void
    updateNewPostText: (newText: string) => void
}

export function Profile(props: ProfileType) {

    return <div className={s.content}>
        <ProfileCover/>
        <ProfileInfo/>
        <ProfileNewPost message={props.profilePage.newPostText}
                        addPost={props.addPost}
                        updateNewPostText={props.updateNewPostText}
        />
        <ProfileAllPost posts={props.profilePage.posts} />
    </div>

}