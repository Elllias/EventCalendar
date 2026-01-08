import {EventActionType, ISetEventsAction, ISetGuestsAction} from "./types";
import {IUser} from "../../../model/IUser";
import {IEvent} from "../../../model/IEvent";
import {AppDispatch} from "../../index";
import {UserService} from "../../../api/UserService";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const EventActionCreators = {
    setGuests: (guests: IUser[]): ISetGuestsAction => ({type: EventActionType.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]): ISetEventsAction => ({type: EventActionType.SET_EVENTS, payload: events}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        const response = await UserService.getUsers();
        dispatch(EventActionCreators.setGuests(response.data));
    },
    createEvent: (event: IEvent) => (dispatch: AppDispatch) => {
        const json = localStorage.getItem("events") || "[]";
        const events = JSON.parse(json) as IEvent[];

        events.push(event);

        localStorage.setItem("events", JSON.stringify(events));

        const username = localStorage.getItem("username");
        const currentUserEvents = events.filter(
            (event) =>
                event.author === username
                || event.guest === username);

        dispatch(EventActionCreators.setEvents(currentUserEvents));
    },
    fetchEvents: (username: string) => (dispatch: AppDispatch) => {
        const json = localStorage.getItem("events") || "[]";
        const events = JSON.parse(json) as IEvent[];
        const currentUserEvents = events.filter(
            (event) =>
                event.author === username
                || event.guest === username);

        dispatch(EventActionCreators.setEvents(currentUserEvents));
    }
}
