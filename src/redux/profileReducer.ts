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
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = "UPDATE-NEW-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";

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
    profile: null
}


export const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {
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

        default:
            return state
    }
}

type ActionType = ReturnType<typeof addPostAC>
    | ReturnType<typeof onPostChangeAC>
    | ReturnType<typeof setUserProfile>

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