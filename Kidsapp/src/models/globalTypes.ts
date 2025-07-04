export type Role = 'guest' | 'user' | 'author';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}