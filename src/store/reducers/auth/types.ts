// types.ts
import {IUser} from "../../../model/IUser";

export interface IAuthState {
    isAuth: boolean;
    user: IUser;
    error: string;
    isLoading: boolean;
}

export enum AuthActionType {
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_USER = "SET_USER",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
}

export interface BaseAction {
    type: string;
    [key: string]: any; // Индексная сигнатура
}

export interface ISetAuthAction extends BaseAction {
    type: AuthActionType.SET_IS_AUTH;
    payload: boolean;
}

export interface ISetUserAction extends BaseAction {
    type: AuthActionType.SET_USER;
    payload: IUser;
}

export interface ISetErrorAction extends BaseAction {
    type: AuthActionType.SET_ERROR;
    payload: string;
}

export interface ISetLoadingAction extends BaseAction {
    type: AuthActionType.SET_IS_LOADING;
    payload: boolean;
}
