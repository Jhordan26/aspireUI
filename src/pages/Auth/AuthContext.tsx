import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    genero: string;
    email: string;
    // otros campos que puedas tener
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null; // Incluir el objeto User en el contexto
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('token') && !!localStorage.getItem('user');
    });
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });
    const [user, setUser] = useState<User | null>(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    });

    const login = (token: string, user: User) => {
        setIsAuthenticated(true);
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('id', user.id.toString()); // Guardar el id en localStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id'); // Limpiar el id de localStorage al hacer logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
