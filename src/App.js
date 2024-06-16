import 'bootstrap/dist/css/bootstrap.min.css';
import {getToken} from "firebase/messaging";
import React, {useEffect} from "react";
import {Route, Routes} from 'react-router-dom';
import DefaultArticle from './components/GenericArticle/GenericArticle';
import NotificationToast from "./components/messaging/Message";
import {messaging} from './firebase';
import Gallery from './pages/Gallery/Gallery';
import Home from './pages/Home';
import LegendV0L2 from './pages/articles/Aleah';
import GeorgeKollias from './pages/articles/GeorgeKollias';
import AcidMamoth from './pages/articles/Interviews/AcidMamoth';
import HollerInterview from './pages/articles/Interviews/Holler';
import KhavarInterview from './pages/articles/Interviews/Khavar';
import Primordial from './pages/articles/Primordial-black-interview';
import ArticleUpload from "./components/UploadSystem/UploadSystem";
import Login from "./components/UploadSystem/Login/Login";
import Register from "./components/UploadSystem/Register/Register";
import FirebaseFileList from "./components/UploadSystem/VerificationSystem/VerificationSystem";
import TranlationSystem from "./components/UploadSystem/TranslationSystem/TranlationSystem";

import UserHome from './components/Users/UserHome';
import SavedArtciles from './components/Users/Pages/Saved';
import './App.css'
import UserProfile from "./components/UploadSystem/Profile/UserProfile";
import Authors from "./pages/Authors/Authors";
import RecommendationSystem from "./components/RecommendationSystem/RecomendationSystem";
import AdminSystem from "./components/AdminSystem/AdminSystem";
import Footer from "./components/footer/footer";
import AppNavigation from "./components/AppNav/AppNav";
import UploadGalleryItem from "./pages/Gallery/uploadArt/UploadGalleryItem";
import ArticlesList from "./pages/ArticlesList/ArticlesList";

import NotFound from "./pages/NotFound/NotFound";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const saveDeviceToken = async (token) => {
        try {
            const response = await fetch('/save_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log success message from Firebase Function
            } else {
                console.error('Failed to save device token');
            }
        } catch (error) {
            console.error('Error saving device token:', error);
        }
    };


    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: "BHbCF6XioBa1F2fLgx7jKudN96QxN8iPlRJsBO4I_lTUipyeBwu7bE3Qee9QU56J873zSGEKpwn2BM8srjC14UQ",
            });

            //We can send token to server
            console.log("Token generated : ", token);

            await saveDeviceToken(token);

        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    useEffect(() => {
        requestPermission().then(r => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-1">
                <NotificationToast />
                <AppNavigation />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/articles-page' element={<ArticlesList />} />
                    <Route path='/Art-Gallery-page' element={<Gallery />} />
                    <Route path='/legends-2-archive' element={<LegendV0L2 />} />
                    <Route path='/Falooda-interview-archive' element={<Primordial />} />
                    <Route path='/Holler-interview-archive' element={<HollerInterview />} />
                    <Route path='/Khavar-interview-archive' element={<KhavarInterview />} />
                    <Route path='/Acid-Mammoth-interview-archive' element={<AcidMamoth />} />
                    <Route path='/legends-5-archive' element={<GeorgeKollias />} />
                    <Route path='/article/:name' element={<DefaultArticle earlyAccess={false} />} />
                    <Route path='/article/early/:name' element={<DefaultArticle earlyAccess={true} />} />
                    <Route path='/about-us' element={<Authors />} />
                    <Route path='/recommended' element={<RecommendationSystem />} />
                    <Route path='/admin' element={<AdminSystem />} />
                    <Route path='/gallery/upload' element={<UploadGalleryItem />} />
                    <Route path='/upload' element={<ArticleUpload />} />
                    <Route path='/upload/register' element={<Register />} />
                    <Route path='/upload/profile' element={<UserProfile />} />
                    <Route path='/upload/admin' element={<FirebaseFileList />} />
                    <Route path='/upload/login' element={<Login admin={false} />} />
                    <Route path='/upload/admin/login' element={<Login admin={true} />} />
                    <Route path='/upload/translation' element={<TranlationSystem />} />
                    <Route path='/User/login' element={<Login admin={false} />} />
                    <Route path='/User/register' element={<Register />} />
                    <Route path='/User/home' element={<UserHome />} />
                    <Route path='/User/Saved' element={<SavedArtciles />} />
                    <Route path='/author/:authorCode' element={<ArticlesList />} />

                    <Route path={"/404"} element={<NotFound/>} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}


export default App;
