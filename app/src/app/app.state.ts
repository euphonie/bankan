import { StatusState } from "./shared/statuses/statuses.reducers";
import { TaskState } from "./shared/tasks/tasks.reducers";

export interface AppState {
    tasks: TaskState;
    statuses: StatusState;
}