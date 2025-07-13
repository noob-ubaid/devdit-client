import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from './useAxiosSecure';

const useComments = (postId) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data;
        }
    });
};

export default useComments;