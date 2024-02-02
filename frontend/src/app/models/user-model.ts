export class UserModel {
    id!: number;
    email!: string;
    first_name!: string;
    last_name!: string;
    password!: string;
    role!: UserRole;
    serviceId!: number;
}

export enum UserRole {
    ADMIN = 'admin',
    ADMIN_SERVICE = 'admin_service',
    USER = 'user',
}


