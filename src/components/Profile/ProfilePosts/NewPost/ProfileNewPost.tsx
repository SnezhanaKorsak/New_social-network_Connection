import React, {ChangeEvent} from 'react';
import s from "./ProfileNewPost.module.css";
import {ActionSType, addPostAC, onPostChangeAC} from "../../../../redux/state";

type ProfileNewPostType = {
    message: string
    dispatch: (action: ActionSType) => void
}


export function ProfileNewPost(props: ProfileNewPostType) {


    const addPost = () => {
        /*props.dispatch({type: "ADD-POST", postText: props.message})
        props.dispatch({type: "UPDATE-NEW-POST", newText: ''})*/
        props.dispatch(addPostAC(props.message))
        props.dispatch(onPostChangeAC(''))
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(onPostChangeAC(e.currentTarget.value))
    }

    return <div className={s.createPosts}>
        Create Post
        <hr/>
        <span className={s.avatar}>
            <img
                src={"https://sun1-83.userapi.com/s/v1/ig2/GTd8EAwDEzqcOlUQLoyckauXcHETC5dOMfQw_yPT0Xcc_mpfp5tD-GGnDG2DAG6pI4fi_7Ko5kdz_H2ofkuO7t5R.jpg?size=200x0&quality=96&crop=82,440,609,609&ava=1\""}
                alt={'avatar'}
            />
        </span>
        <textarea placeholder={"Write something here..."} value={props.message} onChange={onPostChange}/>
        <hr/>
        <button onClick={addPost}>Add</button>
    </div>
}