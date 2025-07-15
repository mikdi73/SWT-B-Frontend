// src/context/UserContext.tsx
import {createContext, useState, useContext, ReactNode, useCallback} from 'react';
import { User } from '../models/globalTypes.ts';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Beim ersten Render: lade aus localStorage; nur für state im Frontend
    const [user, setUserState] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem('user');
            return stored ? (JSON.parse(stored) as User) : null;
        } catch {
            console.warn('Konnte User nicht aus localStorage laden');
            return null;
        }
    });

    // Kümmert sich um den localStorage
    const setUser = useCallback((user: User | null) => {
        try {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        } catch {
            console.warn('Konnte User nicht im localStorage speichern');
        }
        setUserState(user);
    }, []);
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
