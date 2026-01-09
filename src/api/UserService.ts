import {IUser} from "../model/IUser";
import {IEvent} from "../model/IEvent";
import mockUsers from "../mock/user.json";

const enum DataKey{
    AUTH = "auth",
    USERNAME = "username",
    EVENTS = "events"
}

export class UserService {
    static async getUsers(): Promise<IUser[]> {
        return Promise.resolve(mockUsers);
    }

    static getAuth(): boolean{
        return Boolean(localStorage.getItem(DataKey.AUTH));
    }

    static setAuth(value: boolean){
        localStorage.setItem(DataKey.AUTH, String(value));
    }

    static getUsername(): string{
        return localStorage.getItem(DataKey.USERNAME) || "";
    }

    static setUsername(username: string){
        localStorage.setItem(DataKey.USERNAME, username);
    }

    static getEvents(): IEvent[]{
        const json = localStorage.getItem(DataKey.EVENTS) || "[]";
        return JSON.parse(json) as IEvent[];
    }

    static addEvent(event: IEvent){
        const events = UserService.getEvents();
        events.push(event);

        localStorage.setItem(DataKey.EVENTS, JSON.stringify(events));
    }

    static clearUserData() {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
    }
}
