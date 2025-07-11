import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';

const Home = () => {
    return (
        <div className='px-4 md:px-0'>
            <Banner/>
            <Tags/>
        </div>
    );
};

export default Home;