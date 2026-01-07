import {EventActionType, IEventState} from "./types";
import {BaseAction} from "./types";

const initialState: IEventState = {
    events: [],
    guests: []
}

export function eventReducer(state: IEventState = initialState, action: BaseAction): IEventState {
    switch (action.type){
        case EventActionType.SET_GUESTS:
            return {...state, guests: action.payload};
        case EventActionType.SET_EVENTS:
            return {...state, events: action.payload};
        default:
            return state;
    }
}
