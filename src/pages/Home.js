import React, { Suspense } from "react";
import Header from "./../components/HomeCompoments/Header/Header";
import Footer from "../components/footer/footer";

// Lazy load the TopNews and ExploreMore components
const TopNews = React.lazy(() => import("../components/HomeCompoments/TopNewsFeed/TopNews"));
const ExploreMore = React.lazy(() => import("../components/HomeCompoments/ExploreMore/ExpoloreMore"));

const Home = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading Top News...</div>}>
                <TopNews />
            </Suspense>
            <Suspense fallback={<div>Loading Explore More...</div>}>
                <ExploreMore />
            </Suspense>
            <Footer />
        </>
    );
};

export default Home;
