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
}
const initialState: initialStateType = {
    friends: []
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
        default:
            return state
    }
}

type ActionType = ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setFriendsAC>

export const followAC = (friendId: number) => {
    return {
        type: 'FOLLOW',
        friendId
    } as const
}

export const unfollowAC = (friendId: number) => {
    return {
        type: 'UNFOLLOW',
        friendId
    } as const
}

export const setFriendsAC = (friends: Array<FriendType>) => {
    return {
        type: 'SET-FRIENDS',
        friends
    } as const
}