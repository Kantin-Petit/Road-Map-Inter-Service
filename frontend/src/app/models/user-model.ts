export class UserModel {
    id!: number;
    email!: string;
    first_name!: string;
    last_name!: string;
    password!: string;
    role!: UserRole;
    service_id!: number;
    Service!: {
        name: string;
    };

}

export enum UserRole {
    ADMIN = 'admin',
    ADMIN_SERVICE = 'admin_service',
    USER = 'user',
}
