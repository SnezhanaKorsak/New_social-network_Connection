import React from 'react';
import s from "./ProfileAllPost.module.css";
import {Post} from "./Post";
import {PostsType} from "../../../../index";


type ProfileAllPostType = {
    posts: PostsType[]
}

export function ProfileAllPost(props:ProfileAllPostType ) {

    let postElement = props.posts.map(p => <Post message={p.message} likecount={p.likecount}/>)

    return <div className={s.allPosts}>
        {postElement}
    </div>
}