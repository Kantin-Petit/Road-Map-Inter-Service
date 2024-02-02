export class UserModel {
    id!: number;
    email!: string;
    first_name!: string;
    last_name!: string;
    password!: string;
    role!: UserRole;
    serviceId!: number;
    service!: {
        name: string;
    };
    
}

export enum UserRole {
    ADMIN = 'admin',
    ADMIN_SERVICE = 'admin_service',
    USER = 'user',
}
