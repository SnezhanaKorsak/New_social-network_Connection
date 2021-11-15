import {setFriends, toggleIsFetching} from "./friendsReducer"
import {UserAPI} from "../api/api";
import {ThunkCreatorType} from "./redux-store";


export type initialStateType = {
    pageLimit: number
    totalCount: number
    pageNeighbours: number
    currentPage: number
}


const initialState: initialStateType = {
    totalCount: 0,
    pageLimit: 4,
    pageNeighbours: 1,
    currentPage: 1,
}

export const paginationReducer = (state = initialState, action: PaginationActionType): initialStateType => {
    switch (action.type) {
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.page}
        case "SET-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount}


        default:
            return state
    }

}

export type PaginationActionType = ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof setFriends>
    | ReturnType<typeof toggleIsFetching>


export const setTotalCount = (totalCount: number) => {
    return {
        type: "SET-TOTAL-COUNT",
        totalCount
    } as const
}
export const setCurrentPage = (page: number) => {
    return {
        type: "SET-CURRENT-PAGE",
        page
    } as const
}

export const getUserTC = (currentPage: number, pageLimit: number): ThunkCreatorType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        UserAPI.getUsers(currentPage, pageLimit)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setFriends(data.items));
                dispatch(setTotalCount(data.totalCount))
            })
    }
}