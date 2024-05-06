import { createAction, props } from "@ngrx/store";
import { Task } from "./tasks.model";

export const loadTasks = createAction('[TASK] Load Tasks');
export const loadTasksSuccess = createAction('[TASK] Load Tasks Success', props<{tasks: Task[]}>());
export const loadTasksFailure = createAction('[TASK] Load Tasks Failure', props<{error: any}>());