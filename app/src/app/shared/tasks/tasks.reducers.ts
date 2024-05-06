import { createReducer, on } from "@ngrx/store";
import { Task } from "./tasks.model";
import { addTask, addTaskFailure, addTaskSuccess, editTask, editTaskFailure, editTaskSuccess, loadTasks, loadTasksFailure, loadTasksSuccess } from './tasks.actions';

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
        error: null,
        loading: false
    })),
    on(loadTasksFailure, (state: TaskState, {error}) => ({
        ...state,
        error, 
        loading: false
    })),
    // create
    on(addTask, state => ({
        ...state, 
        loading: true,
        error: null
    })),
    on(addTaskSuccess, (state: TaskState, {task}) => ({
        ...state,
        tasks: [
            ...state.tasks,
            task
        ],
        error: null,
        loading: false,
    })),
    on(addTaskFailure, (state: TaskState, {error}) => ({
        ...state,
        loading: false,
        error
    })),
    // edit
    on(editTask, state => ({
        ...state, 
        loading: true,
        error: null
    })),
    on(editTaskSuccess, (state: TaskState, {task}) => ({
        ...state,
        tasks: state.tasks.map((oldTask) => (oldTask.id === task.id) ? task : oldTask),
        error: null,
        loading: false,
    })),
    on(editTaskFailure, (state: TaskState, {error}) => ({
        ...state,
        loading: false,
        error
    }))
)