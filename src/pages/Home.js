import React, { Suspense } from "react";
import Header from "./../components/HomeCompoments/Header/Header";
import Footer from "../components/footer/footer";
import SideMenu from "../components/HomeCompoments/SideMenu/SideMenu";

// Lazy load the TopNews and ExploreMore components
const TopNews = React.lazy(() => import("../components/HomeCompoments/TopNewsFeed/TopNews"));
const ExploreMore = React.lazy(() => import("../components/HomeCompoments/ExploreMore/ExpoloreMore"));

const Home = ({isMenuVisible}) => {
    return (
        <div>
            <section id="header">
                <Header />
            </section>
            <SideMenu isMenuVisible={isMenuVisible}/>
            <Suspense fallback={<div>Loading Top News...</div>}>
                <section id="top-news">
                    <TopNews/>
                </section>
            </Suspense>
            <Suspense fallback={<div>Loading Explore More...</div>}>
                <section id="explore-more">
                    <ExploreMore/>
                </section>
            </Suspense>
            <section id="footer">
                <Footer/>
            </section>
        </div>
);
};

export default Home;
