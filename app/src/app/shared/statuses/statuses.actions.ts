import { createAction, props } from "@ngrx/store";
import { Status } from "./statuses.model";

export const loadStatuses = createAction('[Status] Load Statuses');
export const loadStatusesSuccess = createAction('[Status] Load Statuses Success', props<{statuses: Status[]}>());
export const loadStatusesFailure = createAction('[Status] Load Statuses Failure', props<{error: any}>());
