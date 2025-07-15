import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsHome from '../AnnouncementsHome/AnnouncementsHome';
import AllPosts from '../AllPosts/AllPosts';

const Home = () => {
    const [search,setSearch] = useState("")
    return (
        <div>
            <Banner setSearch={setSearch}/>
            <Tags/>
            <AnnouncementsHome/>
            <AllPosts search={search}/>
        </div>
    );
};

export default Home;