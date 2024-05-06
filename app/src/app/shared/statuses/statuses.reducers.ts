import { createReducer, on } from "@ngrx/store";
import { Status } from "./statuses.model";
import { loadStatuses, loadStatusesFailure, loadStatusesSuccess } from "../statuses/statuses.actions";

export interface StatusState {
    statuses: Status[];
    loading: boolean;
    error: any;
}

const initialState: StatusState = {
    statuses: [],
    loading: false,
    error: null,
}

export const statusesReducer = createReducer(
    initialState, 
    on(loadStatuses, (state: StatusState) => ({
        ...state, 
        loading: true,
        error: null
    })),
    on(loadStatusesSuccess, (state: StatusState, {statuses}) => ({
        ...state,
        statuses, 
        error: null,
        loading: false
    })),
    on(loadStatusesFailure, (state: StatusState, {error}) => ({
        ...state,
        error, 
        loading: false
    })),
);
