import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.authReducer);

    return (
        <Routes>
            {isAuth
                ? privateRoutes.map((route) => (
                    <>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component/>}
                        />
                    </>
                ))
                : publicRoutes.map((route) => (
                    <>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component/>}
                        />
                    </>
                ))
            }
            <Route
                path="*"
                element={<Navigate to={isAuth ? RouteNames.EVENT : RouteNames.LOGIN} replace/>}
            />
        </Routes>
    );
};

export default AppRouter;