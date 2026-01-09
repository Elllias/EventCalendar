import {AuthActionType, ISetAuthAction, ISetErrorAction, ISetLoadingAction, ISetUserAction} from "./types";
import {User} from "../../../model/User";
import {AppDispatch} from "../../index";
import {UserService} from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: User): ISetUserAction => ({type: AuthActionType.SET_USER, payload: user}),
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
                    const users = await UserService.getUsers();
                    const user =
                        users.find(user =>
                            user.username === username
                            && user.password === password);

                    if (user) {
                        UserService.setAuth(true);
                        UserService.setUsername(username);

                        dispatch(AuthActionCreators.setUser(user));
                        dispatch(AuthActionCreators.setAuth(true));
                        dispatch(AuthActionCreators.setError(""));
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
            UserService.clearUserData();

            dispatch(AuthActionCreators.setLoading(false));
            dispatch(AuthActionCreators.setUser({} as User));
            dispatch(AuthActionCreators.setAuth(false));
        }
}
