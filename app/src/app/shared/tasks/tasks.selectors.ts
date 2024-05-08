import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "./tasks.reducers";
import { selectStatuses } from "../statuses/statuses.selectors";
import { Task } from "./tasks.model";
import { STATUS, Status } from "../statuses/statuses.model";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state: TaskState) => state.tasks);

export const selectTasksLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);

export const selectTasksError = createSelector(selectTaskState, (state: TaskState) => state.error);

export const selectPendingTasks = createSelector(selectTasks, selectStatuses, (tasks: Task[], statuses: Status[]) => {
    return tasks.filter((task) => task.statusId === STATUS.PENDING).map(task => ({
        ...task,
        status: statuses.find(status => status.id === task.statusId)
    }));
})

export const selectCompletedTasks = createSelector(selectTasks, selectStatuses, (tasks: Task[], statuses: Status[]) => {
    return tasks.filter((task) => task.statusId === STATUS.COMPLETED).map(task => ({
        ...task,
        status: statuses.find(status => status.id === task.statusId)
    }));
})

export const selectTasksWithStatusFilter = (filteredStatus?: number) =>  createSelector(selectTasks, selectStatuses, (tasks: Task[], statuses: Status[]) => {
    return tasks
        .filter(task => !filteredStatus || task.statusId === filteredStatus)
        .map(task => ({
        ...task,
        status: statuses.find(status => status.id === task.statusId)
    }))
})