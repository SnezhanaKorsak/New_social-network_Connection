import {ThunkCreatorType} from "./redux-store";
import {UserAPI} from "../api/api";
import {followUnfollowFlow} from "../utils/helper-utils";

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
    uniqueUrlName: null | string
}
export type initialStateType = {
    friends: Array<FriendType>
    isFetching: boolean
    followingInProgress: number[]
}
const initialState: initialStateType = {
    friends: [],
    isFetching: false,
    followingInProgress: []
}


export const friendsReducer = (state = initialState, action: UserActionType): initialStateType => {
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

        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return action.isFetching
                ? {...state, followingInProgress: [...state.followingInProgress, action.userId]}
                : {...state, followingInProgress: state.followingInProgress.filter(id => id !== action.userId)}


        default:
            return state
    }
}

export type UserActionType = followUnfollowActionsType
    | ReturnType<typeof setFriends>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>

export  type followUnfollowActionsType = ReturnType<typeof follow> | ReturnType<typeof unfollow>

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
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: "TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching, userId
    } as const
}


export const followTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    const apiMethod = UserAPI.followUser.bind(UserAPI)

    await followUnfollowFlow(dispatch, userId, apiMethod, follow)
}

export const unfollowTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    const apiMethod = UserAPI.unfollowUser.bind(UserAPI)

    await followUnfollowFlow(dispatch, userId, apiMethod, unfollow)
}