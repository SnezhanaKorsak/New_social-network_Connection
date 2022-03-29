import {Dispatch} from "redux";
import {followUnfollowActionsType, toggleIsFollowingProgress} from "../redux/friendsReducer";


export const followUnfollowFlow = async (dispatch: Dispatch, userId: number,
                                         apiMethod: (userId: number) => any,
                                         action: (friendId: number) => followUnfollowActionsType) => {
    dispatch(toggleIsFollowingProgress(true, userId))

    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(action(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
