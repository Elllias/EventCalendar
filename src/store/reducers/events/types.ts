import {IUser} from "../../../model/IUser";
import {IEvent} from "../../../model/IEvent";

export interface IEventState {
    guests: IUser[];
    events: IEvent[];
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
    payload: IUser[];
}

export interface ISetEventsAction extends BaseAction {
    type: EventActionType.SET_EVENTS;
    payload: IEvent[];
}
