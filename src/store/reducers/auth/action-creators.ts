import {AuthActionType, ISetAuthAction, ISetErrorAction, ISetLoadingAction, ISetUserAction} from "./types";
import {IUser} from "../../../model/IUser";
import {AppDispatch} from "../../index";
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
        async (dispatch: AppDispatch) => {
            try {
                dispatch(AuthActionCreators.setLoading(true));

                // Simulating a request to the server
                setTimeout(async () => {
                    const response = await UserService.getUsers();
                    const user =
                        response.data.find(user =>
                            user.username === username
                            && user.password === password);

                    if (user) {
                        localStorage.setItem("auth", "true");
                        localStorage.setItem("username", username);

                        dispatch(AuthActionCreators.setUser(user));
                        dispatch(AuthActionCreators.setAuth(true));
                    } else {
                        dispatch(AuthActionCreators.setError(`Invalid Username or Password`));
                    }

                    dispatch(AuthActionCreators.setLoading(false));
                }, 1000);
            } catch (e) {
                dispatch(AuthActionCreators.setError(`Error at Login Action: ${e}`));
            }
        },
    logout: () =>
        async (dispatch: AppDispatch) => {
            localStorage.removeItem("auth");
            localStorage.removeItem("username");

            dispatch(AuthActionCreators.setLoading(false));
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setAuth(false));
        }
}
