import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsHome from '../AnnouncementsHome/AnnouncementsHome';

const Home = () => {
    return (
        <div className='px-4 md:px-0'>
            <Banner/>
            <Tags/>
            <AnnouncementsHome/>
        </div>
    );
};

export default Home;