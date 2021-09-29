import React from 'react';
import s from "./ProfileNewPost.module.css";

export function ProfileNewPost() {
    return <div className={s.createPosts}>
        Create Post
        <hr/>
        <span className={s.avatar}>
            <img
                src={"https://sun1-83.userapi.com/s/v1/ig2/GTd8EAwDEzqcOlUQLoyckauXcHETC5dOMfQw_yPT0Xcc_mpfp5tD-GGnDG2DAG6pI4fi_7Ko5kdz_H2ofkuO7t5R.jpg?size=200x0&quality=96&crop=82,440,609,609&ava=1\""}/>
        </span>
        <textarea placeholder={"Write something here..."}/>
        <hr/>
        <button>Add</button>
    </div>
}