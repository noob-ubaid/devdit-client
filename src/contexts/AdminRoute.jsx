import React from 'react';
import { Navigate} from 'react-router';
import Loader from '../shared/Loader';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const [role,isPending] = useRole()
    if(isPending) return <Loader/>
    if(role && role==='admin'){
        return children
    }else{
        return <Navigate to='/'></Navigate>
    }
};

export default AdminRoute;