import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./tasks.reducers";
import { selectStatuses } from "../statuses/statuses.selectors";
import { Task } from "./tasks.model";
import { Status } from "../statuses/statuses.model";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state: TaskState) => state.tasks);

export const selectTasksLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);

export const selectTasksError = createSelector(selectTaskState, (state: TaskState) => state.error);

export const selectTasksWithStatus = createSelector(selectTasks, selectStatuses, (tasks: Task[], statuses: Status[]) => {
    return tasks.map(task => ({
        ...task,
        status: statuses.find(status => status.id === task.statusId)
    }));
})