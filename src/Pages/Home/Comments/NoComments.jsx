import React from 'react';

const NoComments = () => {
    return (
        <div className='w-full bg-white rounded-md py-8 md:py-12 '>
            <p className='font-main font-semibold text-2xl md:text-3xl text-center'>No Comments Yet</p>
            <p className='font-main font-medium text-xl mt-4 text-gray-600 md:text-2xl text-center'>Share your thoughts and start the conversation.</p>
        </div>
    );
};

export default NoComments;