import {Login} from "../pages/login/Login";
import {Events} from "../pages/events/Events";

interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = "/login",
    EVENT = "/",
}

export const publicRoutes: IRoute[] = [{
    path: RouteNames.LOGIN, exact: true, component: Login
}]
export const privateRoutes: IRoute[] = [{
    path: RouteNames.EVENT, exact: true, component: Events
}]
