import React from 'react';
import s from "./ProfileAllPost.module.css";
import {Post} from "./Post";

export function ProfileAllPost() {
    return <div className={s.allPosts}>
        <Post message={"Work hard to get what you like, otherwise you'll be forced to just like what you get."}
              likecount={15}/>
        <Post message={"Success is the ability to go from failure to failure without losing your enthusiasm."}
              likecount={20}/>

    </div>
}