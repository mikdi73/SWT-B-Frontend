// src/context/UserContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../models/globalTypes.ts';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser muss innerhalb eines UserProvider verwendet werden');
    return ctx;
};
