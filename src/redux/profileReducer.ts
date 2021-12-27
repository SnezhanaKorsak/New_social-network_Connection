import {ThunkCreatorType} from "./redux-store";
import {ProfileAPI} from "../api/api";

export type PostType = {
    id: number
    message: string
    likeCount: number
}
type ContactsType = {
    facebook: string
    website: string | null
    vk: string
    twitter: string
    instagram: string
    youtube: null,
    github: string
    mainLink: null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    "contacts": ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string,
    profile: ProfileType | null
    status: string
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = "UPDATE-NEW-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

const initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            message: "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
            likeCount: 15
        },
        {
            id: 2,
            message: "Success is the ability to go from failure to failure without losing your enthusiasm.",
            likeCount: 20
        }
    ],
    newPostText: '',
    profile: null,
    status: ''
}


export const profileReducer = (state = initialState, action: UserProfileActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likeCount: 0
            }

            return {...state, posts: [...state.posts, newPost], newPostText: ''};

        case UPDATE_NEW_POST:
            return {...state, newPostText: action.newText};

        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}

        case "SET-USER-STATUS":
            return {...state, status: action.status}

        default:
            return state
    }
}

export type UserProfileActionType = ReturnType<typeof addPostAC>
    | ReturnType<typeof onPostChangeAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>

export const addPostAC = (postText: string) => {

    return {
        type: ADD_POST,
        postText
    } as const
}

export const onPostChangeAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST,
        newText
    } as const
}
export const setUserProfile = (profile: ProfileType | null) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setUserStatus = (status: string) => {
    return {
        type: SET_USER_STATUS,
        status
    } as const
}

export const getUserProfileTC = (userId: string): ThunkCreatorType => {
    return (dispatch => {
        ProfileAPI.getUsersProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    })
}
export const getUserStatusTC = (userId: string): ThunkCreatorType => {
    return (dispatch => {
        ProfileAPI.getUserStatus(userId)
            .then(response => {
                dispatch(setUserStatus(response.data))
            })
    })
}
export const updateStatusTC = (status: string): ThunkCreatorType => {
    return (dispatch => {
        ProfileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0)
                dispatch(setUserStatus(status))
            })
    })
}