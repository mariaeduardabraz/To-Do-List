import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Tenta pegar o token do armazenamento local na primeira vez que carrega
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken) => {
        localStorage.setItem('token', newToken); // Guarda o token no navegador
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove o token
        setToken(null);
    };

    const isAuthenticated = !!token;

    // O Provedor disponibiliza esses valores para todos os componentes filhos
    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Cria um Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
};