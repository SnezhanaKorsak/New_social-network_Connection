import {InferActionsType, ThunkCreatorType} from "./redux-store";
import {appActions} from "./appReducer";
import {AxiosError} from "axios";
import {profileAPI} from "../api/profile-api";

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
        case "ADD-POST":
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likeCount: 0
            }

            return {...state, posts: [...state.posts, newPost], newPostText: ''};

        case "UPDATE-NEW-POST":
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

export type UserProfileActionType = InferActionsType<typeof profileActions>

//actions
export const profileActions = {
    addPostAC: (postText: string) => ({type: "ADD-POST", postText} as const),
    onPostChangeAC: (newText: string) => ({type: "UPDATE-NEW-POST", newText} as const),
    setUserProfile: (profile: ProfileType | null) => ({type: "SET-USER-PROFILE", profile} as const),
    setUserStatus: (status: string) => ({type: "SET-USER-STATUS", status} as const),
    deletePostAC : (id: number) => ({type: "DELETE-POST", id} as const),
    updatePhotoAC : (photos: PhotosType) => ({type: "UPDATE-PHOTO", photos} as const)
}


//thunk
export const getUserProfileTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.getUsersProfile(userId)
    dispatch(profileActions.setUserProfile(response.data))
}

export const getUserStatusTC = (userId: string): ThunkCreatorType => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(profileActions.setUserStatus(response.data))

}
export const updateStatusTC = (status: string): ThunkCreatorType => (dispatch) => {

    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(profileActions.setUserStatus(status))
            } else {
                dispatch(appActions.setError(response.data.messages[0]))
            }
        })
        .catch((error: AxiosError) => {
            dispatch(appActions.setError(error.message))
        })
}

export const savePhotoTC = (file: string): ThunkCreatorType => (dispatch) => {
    profileAPI.savePhoto(file)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(profileActions.updatePhotoAC(response.data.photos))
            }  else {
                dispatch(appActions.setError(response.messages[0]))
            }
        })
        .catch((error: AxiosError) => {
            dispatch(appActions.setError(error.message))
        })
}

export const updateProfileTC = (profile: ProfileType): ThunkCreatorType => (dispatch) => {
    profileAPI.updateProfile(profile)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getUserProfileTC(profile.userId))
            } else {
                dispatch(appActions.setError(response.data.messages[0]))
            }
        })
        .catch((error: AxiosError) => {
            dispatch(appActions.setError(error.message))
        })
}