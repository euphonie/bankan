import { TaskState } from "./shared/tasks/tasks.reducers";

export interface AppState {
    tasks: TaskState;
}