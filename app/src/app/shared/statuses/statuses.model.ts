export enum StatusType {
    'INITIAL',
    'REGULAR',
    'FINAL'
}

export interface Status {
    id: number;
    description: string;
    color: string;
    status_type: StatusType;
}