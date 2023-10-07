export interface User {
    email: string;
    password: string;
    isBlocked:boolean;
    roles?: string;
}