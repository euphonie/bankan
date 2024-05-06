export interface Task {
    title: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    owner: number;
    assigned_to: number;
}