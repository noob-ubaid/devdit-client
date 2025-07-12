import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsHome from '../AnnouncementsHome/AnnouncementsHome';
import AllPosts from '../AllPosts/AllPosts';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Tags/>
            <AnnouncementsHome/>
            <AllPosts/>
        </div>
    );
};

export default Home;