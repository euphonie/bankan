import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./tasks.reducers";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state: TaskState) => state.tasks);

export const selectTasksLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);

export const selectTasksError = createSelector(selectTaskState, (state: TaskState) => state.error);