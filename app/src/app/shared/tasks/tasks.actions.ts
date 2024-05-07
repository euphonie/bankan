import { createAction, props } from "@ngrx/store";
import { Task } from "./tasks.model";
import { HttpErrorResponse } from "@angular/common/http";

export const loadTasks = createAction('[TASK] Load Tasks');
export const loadTasksSuccess = createAction('[TASK] Load Tasks Success', props<{tasks: Task[]}>());
export const loadTasksFailure = createAction('[TASK] Load Tasks Failure', props<{error: any}>());

export const addTask = createAction('[TASK] Add Task', props<{task: Task}>())
export const addTaskSuccess = createAction('[TASK] Add Task Success', props<{task: Task}>())
export const addTaskFailure = createAction('[TASK] Add Task Failure', props<{error: any}>())

export const editTask = createAction('[TASK] Edit Task', props<{task: Task}>())
export const editTaskSuccess = createAction('[TASK] Edit Task Success', props<{task: Task}>())
export const editTaskFailure = createAction('[TASK] Edit Task Failure', props<{error: HttpErrorResponse}>())

export const softDeleteTask = createAction('[TASK] Soft Delete Task', props<{task: Task}>())
export const softDeleteTaskSuccess = createAction('[TASK] Soft Delete Task Success', props<{task: Task}>())
export const softDeleteTaskFailure = createAction('[TASK] Soft Delete Task Error', props<{error: HttpErrorResponse}>())

export const restoreTask = createAction('[TASK] Restore Task', props<{task: Task}>())
export const restoreTaskSuccess = createAction('[TASK] Restore Task Success', props<{task: Task}>())
export const restoreTaskFailure = createAction('[TASK] Restore Task Error', props<{error: HttpErrorResponse}>())