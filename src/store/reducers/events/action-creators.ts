import {EventActionType, ISetEventsAction, ISetGuestsAction} from "./types";
import {IUser} from "../../../model/IUser";
import {IEvent} from "../../../model/IEvent";
import {AppDispatch} from "../../index";
import {UserService} from "../../../api/UserService";

export const EventActionCreators = {
    setGuests: (guests: IUser[]): ISetGuestsAction => ({type: EventActionType.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]): ISetEventsAction => ({type: EventActionType.SET_EVENTS, payload: events}),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        const users = await UserService.getUsers();
        dispatch(EventActionCreators.setGuests(users));
    },
    createEvent: (event: IEvent) => (dispatch: AppDispatch) => {
        UserService.addEvent(event);

        const events = UserService.getEvents();
        const username = UserService.getUsername();
        const currentUserEvents = events.filter(
            (event) =>
                event.author === username
                || event.guest === username);

        dispatch(EventActionCreators.setEvents(currentUserEvents));
    },
    fetchEvents: (username: string) => (dispatch: AppDispatch) => {
        const events = UserService.getEvents();
        const currentUserEvents = events.filter(
            (event) =>
                event.author === username
                || event.guest === username);

        dispatch(EventActionCreators.setEvents(currentUserEvents));
    }
}
