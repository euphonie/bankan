import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatusState } from "./statuses.reducers";

export const selectStatusState = createFeatureSelector<StatusState>('statuses');

export const selectStatuses = createSelector(selectStatusState, (state: StatusState) => state.statuses);

export const selectStatusesLoading = createSelector(selectStatusState, (state: StatusState) => state.loading);

export const selectStatusesError = createSelector(selectStatusState, (state: StatusState) => state.error);