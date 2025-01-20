import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const ProtectedRouter = ({children}) =>{
    const {state} = useAuth();
    return state.isAuthenticated ? children : <Navigate to='/' />
}

export default ProtectedRouter;