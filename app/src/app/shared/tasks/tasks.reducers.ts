import { createReducer, on } from "@ngrx/store";
import { Task } from "./tasks.model";
import { loadTasks, loadTasksFailure, loadTasksSuccess } from './tasks.actions';


export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: any;
}

export const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
}

export const tasksReducer = createReducer(
    initialState,
    on(loadTasks, (state: TaskState) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadTasksSuccess, (state: TaskState, {tasks}) => ({
        ...state,
        tasks, 
        loading: false
    })),
    on(loadTasksFailure, (state: TaskState, {error}) => ({
        ...state,
        error, 
        loading: false
    }))
)