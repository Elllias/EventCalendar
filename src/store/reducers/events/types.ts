import {User} from "../../../model/User";
import {Event} from "../../../model/Event";

export interface IEventState {
    guests: User[];
    events: Event[];
}

export enum EventActionType {
    SET_GUESTS = "SET_GUESTS",
    SET_EVENTS = "SET_EVENTS",
}

export interface BaseAction {
    type: string;
    [key: string]: any; // Индексная сигнатура
}

export interface ISetGuestsAction extends BaseAction {
    type: EventActionType.SET_GUESTS;
    payload: User[];
}

export interface ISetEventsAction extends BaseAction {
    type: EventActionType.SET_EVENTS;
    payload: Event[];
}
