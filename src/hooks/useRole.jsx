import React from 'react';
import { axiosSecure } from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import Loader from '../shared/Loader';

const useRole = () => {
    const {user} = useAuth()
    const { data: role = [], isPending } = useQuery({
    queryKey: ["userRole",user],
    queryFn: async () => {
      const result = await axiosSecure(`/role/${user?.email}`);
      return result.data;
    },
  });
    return [role,isPending]
};

export default useRole;