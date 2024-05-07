import { Status } from "../statuses/statuses.model";

export interface TaskDto {
    id?: number;
    title: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    owner: number;
    assigned_to: number;
}

export interface Task {
    id?: number;
    title: string;
    statusId: number;
    status?: Status;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
    owner: number;
    assigned_to: number;
}