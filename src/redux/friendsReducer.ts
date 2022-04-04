import {InferActionsType, ThunkCreatorType} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/user-api";

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


export const friendsReducer = (state = initialState, action: UserActionsType): initialStateType => {
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

export type UserActionsType = InferActionsType<typeof friendsActions>

//actions
export const friendsActions = {
    follow : (friendId: number) => ({type: 'FOLLOW', friendId} as const),
    unfollow : (friendId: number) => ({type: 'UNFOLLOW', friendId} as const),
    setFriends : (friends: Array<FriendType>) => ({type: 'SET-FRIENDS', friends} as const),
    toggleIsFetching : (isFetching: boolean) => ({type: "TOGGLE-IS-FETCHING", isFetching} as const),
    toggleIsFollowingProgress : (isFetching: boolean, userId: number) => ({
        type: "TOGGLE-IS-FOLLOWING-PROGRESS",
        isFetching, userId} as const),
}

//thunk
const followUnfollowFlow = async (dispatch: Dispatch, userId: number,
                                  apiMethod: (userId: number) => any,
                                  action: (friendId: number) => UserActionsType) => {
    dispatch(friendsActions.toggleIsFollowingProgress(true, userId))

    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(friendsActions.toggleIsFollowingProgress(false, userId))
}


export const followTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    const apiMethod = userAPI.followUser.bind(userAPI)

    await followUnfollowFlow(dispatch, userId, apiMethod, friendsActions.follow)
}

export const unfollowTC = (userId: number): ThunkCreatorType => async (dispatch) => {
    const apiMethod = userAPI.unfollowUser.bind(userAPI)

    await followUnfollowFlow(dispatch, userId, apiMethod, friendsActions.unfollow)
}

