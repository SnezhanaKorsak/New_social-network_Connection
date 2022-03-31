import {ThunkCreatorType} from "./redux-store";
import {profileAPI} from "../api/api";

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
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
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

        case "DELETE-POST":
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}

        case "UPDATE-PHOTO":
            return {...state, profile: state.profile ? {...state.profile, photos: action.photos} : null}


        default:
            return state
    }
}

export type UserProfileActionType = ReturnType<typeof addPostAC>
    | ReturnType<typeof onPostChangeAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof updatePhotoAC>

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

export const deletePostAC = (id: number) => {
    return {
        type: "DELETE-POST",
        id
    } as const
}

export const updatePhotoAC = (photos: PhotosType) => ({type: "UPDATE-PHOTO", photos} as const)

//thunk
export const getUserProfileTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.getUsersProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatusTC = (userId: string): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))

}
export const updateStatusTC = (status: string): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhotoTC = (file: string): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(updatePhotoAC(response.data.data.photos))
    }
}

export const updateProfileTC = (profile: ProfileType): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.updateProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(profile.userId))
    }
}