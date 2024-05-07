export enum StatusType {
    'INITIAL',
    'REGULAR',
    'FINAL'
}

export const STATUS = {
    PENDING: 1,
    COMPLETED: 2,
}

export interface Status {
    id: number;
    description: string;
    color: string;
    status_type: StatusType;
}