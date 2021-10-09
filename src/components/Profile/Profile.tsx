import React from 'react';
import s from "./Profile.module.css"
import {ProfileCover} from "./ProfileCover/ProfileCover";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileNewPost} from "./ProfilePosts/NewPost/ProfileNewPost";
import {ProfileAllPost} from "./ProfilePosts/AllPosts/ProfileAllPost";
import {PostsType} from "../../index";

type ProfileType = {
    posts: PostsType[]
}

export function Profile(props: ProfileType) {

    return <div className={s.content}>
        <ProfileCover/>
        <ProfileInfo/>
        <ProfileNewPost/>
        <ProfileAllPost posts={props.posts} />
    </div>

}