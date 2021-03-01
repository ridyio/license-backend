import { Client } from "../database/client.entity";

export enum ServerStatus {
    OK = 'OK',
    FAILED = 'FAILED'
}
export enum ServerError {
    UNKNOWN = 'UNKNOWN',
}

export class RequestResponse<T> {
    status: ServerStatus;
    data?: T;
    errorMessage?: string;
    error?: ServerError;
    count?: number;
    constructor(data: T) {
        this.status = ServerStatus.OK;
        this.data = data;
    }
}

export class VerifyResponse {
    status: 'OK' | 'FAILED' | 'USED';
    token?: string;
    message?: string;
    clients?: Client[];
}