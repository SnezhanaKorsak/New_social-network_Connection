import React from "react";
import {ProfileNewPost} from "./NewPost/ProfileNewPost";
import {ProfileAllPost} from "./AllPosts/ProfileAllPost";
import {ProfilePageType} from "../../../redux/profileReducer";


type ProfilePostsType = {
    profilePage: ProfilePageType
    addPost: (postText: string) => void
    onPostChange: (newText: string) => void
}

export const ProfilePosts: React.FC<ProfilePostsType> = ({profilePage, addPost, onPostChange}) => {
    return (
        <>
            <ProfileNewPost message={profilePage.newPostText}
                            addPost={addPost}
                            onPostChange={onPostChange}
            />
            <ProfileAllPost posts={profilePage.posts}/>
        </>
    )
}