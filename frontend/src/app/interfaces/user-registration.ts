export enum UserRole {
    ADMIN = 'admin',
    ADMIN_SERVICE = 'admin_service',
    USER = 'user',
}

export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    service: number;
}