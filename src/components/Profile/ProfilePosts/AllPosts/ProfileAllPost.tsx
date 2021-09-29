import React from 'react';
import s from "./ProfileAllPost.module.css";
import {Post} from "./Post";

export function ProfileAllPost() {
return  <div className={s.allPosts}>
    <Post/>
    <Post/>
    <Post/>
</div>
}