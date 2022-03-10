import React from 'react';
import s from "./ProfileAllPost.module.css";
import {Post} from "./Post";
import {PostType} from "../../../../redux/profileReducer";


type ProfileAllPostType = {
    posts: PostType[]
}

export function ProfileAllPost(props: ProfileAllPostType) {

    let postElement = props.posts.map(p => <Post key={p.id} message={p.message} likecount={p.likeCount}/>)

    return <div className={s.allPosts}>
        {postElement}
    </div>
}