import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth";
import {eventReducer} from "./reducers/events";

export const store = configureStore({
    reducer: {
        authReducer,
        eventReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;