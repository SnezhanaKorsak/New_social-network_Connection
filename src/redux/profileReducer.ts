export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST = "UPDATE-NEW-POST";

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
    newPostText: ''
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

        default:
            return state
    }
}

type ActionType = ReturnType<typeof addPostAC> | ReturnType<typeof onPostChangeAC>

export const addPostAC = (postText: string) => {

    return {
        type: ADD_POST,
        postText: postText
    } as const
}

export const onPostChangeAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST,
        newText: newText
    } as const
}