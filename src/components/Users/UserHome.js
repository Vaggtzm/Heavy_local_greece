import React from "react";
import AppNavigation from "../AppNav/AppNav";
import Header from "../HomeCompoments/Header/Header";
import EarlyBirds from "./EarlyBirds";
import TopNews from "../HomeCompoments/TopNewsFeed/TopNews";
const UserHome = () => {

   return (
        <>
        <AppNavigation />
        <Header />
        <EarlyBirds />
        <TopNews />
        </>
    );
};

export default UserHome;
