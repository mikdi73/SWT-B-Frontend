export type Role = 'GUEST' | 'USER' | 'AUTHOR';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    jwt: string;
}