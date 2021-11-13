type PhotosType = {
    small: string
    large: string
}
export type FriendType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean

}
export type initialStateType = {
    friends: Array<FriendType>
    isFetching: boolean
}
const initialState: initialStateType = {
    friends: [],
    isFetching: false
}


export const friendsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state, friends: state.friends.map(f => f.id === action.friendId
                    ? {...f, followed: true} : f)
            };

        case "UNFOLLOW":
            return {
                ...state, friends: state.friends.map(f => f.id === action.friendId
                    ? {...f, followed: false} : f)
            };

        case "SET-FRIENDS":
            return {...state, friends: [...action.friends]}

        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}


        default:
            return state
    }
}

type ActionType = ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setFriends>
    | ReturnType<typeof toggleIsFetching>

export const follow = (friendId: number) => {
    return {
        type: 'FOLLOW',
        friendId
    } as const
}

export const unfollow = (friendId: number) => {
    return {
        type: 'UNFOLLOW',
        friendId
    } as const
}

export const setFriends = (friends: Array<FriendType>) => {
    return {
        type: 'SET-FRIENDS',
        friends
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: "TOGGLE-IS-FETCHING",
        isFetching
    } as const
}