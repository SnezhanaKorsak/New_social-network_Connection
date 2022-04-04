import {InferActionsType, ThunkCreatorType} from "./redux-store";
import {getAuthDataTC} from "./authReducer";

export type initialStateType = {
    initialized: boolean;
    rootError: string | null,
}

const initialState: initialStateType = {
    initialized: false,
    rootError: null,
}

export const appReducer = (state = initialState, action: AppActionType): initialStateType => {
    switch (action.type) {
        case "SET-INITIALISED":
            return {...state, initialized: true}

        case "SET-ERROR":
            return {...state, rootError: action.error}

        default:
            return state
    }

}

export type AppActionType = InferActionsType<typeof appActions>

export const appActions = {
    setInitialised : () => ({type: "SET-INITIALISED",} as const),
    setError : (error: string | null) => ({type: "SET-ERROR", error} as const)
}


//thunk
export const initializeApp = (): ThunkCreatorType<Promise<void>> => async (dispatch) => {
    await dispatch(getAuthDataTC())
    dispatch(appActions.setInitialised())
}

export const setRootError = (error: string | null): ThunkCreatorType => (dispatch) => {
    dispatch(appActions.setError(error))

    if (error) {
        setTimeout(() => {
            dispatch(appActions.setError(null));
        }, 3000);
    }
}
