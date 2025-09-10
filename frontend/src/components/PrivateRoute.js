import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth(); // Usa o contexto para verificar

    // Se estiver autenticado, continua para a página solicitada (Home).
    // Senão, redireciona para a página de login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;