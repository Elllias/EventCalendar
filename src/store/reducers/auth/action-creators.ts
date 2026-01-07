import {AuthActionType, ISetAuthAction, ISetErrorAction, ISetLoadingAction, ISetUserAction} from "./types";
import {IUser} from "../../../model/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";
import {UserService} from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): ISetUserAction => ({type: AuthActionType.SET_USER, payload: user}),
    setAuth: (isAuth: boolean): ISetAuthAction => ({type: AuthActionType.SET_IS_AUTH, payload: isAuth}),
    setLoading: (isLoading: boolean): ISetLoadingAction => ({
        type: AuthActionType.SET_IS_LOADING,
        payload: isLoading
    }),
    setError: (error: string): ISetErrorAction => ({type: AuthActionType.SET_ERROR, payload: error}),
    login: (username: string, password: string) =>
        async (dispath: AppDispatch) => {
            try {
                dispath(AuthActionCreators.setLoading(true));

                setTimeout(async () => {
                    const response = await UserService.getUsers();
                    const user =
                        response.data.find(user =>
                            user.username === username
                            && user.password === password);

                    if (user) {
                        localStorage.setItem('auth', 'true');
                        localStorage.setItem('username', username);

                        dispath(AuthActionCreators.setUser(user));
                        dispath(AuthActionCreators.setAuth(true));
                    } else {
                        dispath(AuthActionCreators.setError(`Invalid Username or Password`));
                    }

                    dispath(AuthActionCreators.setLoading(false));
                }, 1000);
            } catch (e) {
                dispath(AuthActionCreators.setError(`Error at Login Action: ${e}`));
            }
        },
    logout: () =>
        async (dispath: AppDispatch) => {
            localStorage.removeItem('auth');
            localStorage.removeItem('username');

            dispath(AuthActionCreators.setLoading(false));
            dispath(AuthActionCreators.setUser({} as IUser));
            dispath(AuthActionCreators.setAuth(false));
        }
}
