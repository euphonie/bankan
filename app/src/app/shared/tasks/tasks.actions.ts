import { createAction, props } from "@ngrx/store";
import { Task } from "./tasks.model";

export const loadTasks = createAction('[TASK] Load Tasks');
export const loadTasksSuccess = createAction('[TASK] Load Tasks Success', props<{tasks: Task[]}>());
export const loadTasksFailure = createAction('[TASK] Load Tasks Failure', props<{error: any}>());

export const addTask = createAction('[TASK] Add Task', props<{task: Task}>())
export const addTaskSuccess = createAction('[TASK] Add Task Success', props<{task: Task}>())
export const addTaskFailure = createAction('[TASK] Add Task Failure', props<{error: any}>())