import {AuthActionType, BaseAction, IAuthState} from "./types";
import {User} from "../../../model/User";

const initialState: IAuthState = {
    isAuth: false,
    user: {} as User,
    error: "",
    isLoading: false
}

export function authReducer(state = initialState, action: BaseAction): IAuthState {
    switch (action.type) {
        case AuthActionType.SET_USER:
            return {...state, user: action.payload, isLoading: false}
        case AuthActionType.SET_IS_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}
        case AuthActionType.SET_ERROR:
            return {...state, error: action.payload}
        case AuthActionType.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
}
