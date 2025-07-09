import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../shared/LOader';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading) return <Loader/>
    if(user && user?.email){
        return children
    }else{
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default PrivateRoute;