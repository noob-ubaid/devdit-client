import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsHome from '../AnnouncementsHome/AnnouncementsHome';
import AllPosts from '../AllPosts/AllPosts';
import Faq from '../FAQ/Faq';
import NewsletterSection from '../Newsletter/NewsLetter';

const Home = () => {
    const [search,setSearch] = useState("")
    return (
        <div>
            <Banner search={search} setSearch={setSearch}/>
            <Tags/>
            <AnnouncementsHome/>
            <AllPosts search={search}/>
            <Faq/>
            <NewsletterSection/>
        </div>
    );
};

export default Home;