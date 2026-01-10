import {User} from "../model/User";
import {Event} from "../model/Event";
import mockUsers from "../mock/user.json";

const enum DataKey {
    AUTH = "auth",
    USERNAME = "username",
    EVENTS = "events"
}

export class UserService {
    static async getUsers(): Promise<User[]> {
        return Promise.resolve(mockUsers);
    }

    static getAuth(): boolean {
        return Boolean(localStorage.getItem(DataKey.AUTH));
    }

    static setAuth(value: boolean) {
        localStorage.setItem(DataKey.AUTH, String(value));
    }

    static getUsername(): string {
        return localStorage.getItem(DataKey.USERNAME) || "";
    }

    static setUsername(username: string) {
        localStorage.setItem(DataKey.USERNAME, username);
    }

    static getEvents(): Event[] {
        const json = localStorage.getItem(DataKey.EVENTS) || "[]";
        return JSON.parse(json) as Event[];
    }

    static addEvent(event: Event) {
        const events = UserService.getEvents();
        events.push(event);

        localStorage.setItem(DataKey.EVENTS, JSON.stringify(events));
    }

    static clearUserData() {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
    }
}
