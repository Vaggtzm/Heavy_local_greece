import 'bootstrap/dist/css/bootstrap.min.css';
import {getToken} from "firebase/messaging";
import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import DefaultArticle from './components/GenericArticle/GenericArticle';
import NotificationToast from "./components/messaging/Message";
import {config, functions, messaging} from './firebase';
import Gallery from './pages/Gallery/Gallery';
import Home from './pages/Home';
import LegendV0L2 from './pages/articles/Aleah';
import GeorgeKollias from './pages/articles/GeorgeKollias';
import AcidMamoth from './pages/articles/Interviews/AcidMamoth';
import HollerInterview from './pages/articles/Interviews/Holler';
import KhavarInterview from './pages/articles/Interviews/Khavar';
import Primordial from './pages/articles/Primordial-black-interview';
import ArticleUpload from "./systems/UploadSystem/UploadSystem";
import Login from "./systems/UploadSystem/Login/Login";
import Register from "./systems/UploadSystem/Register/Register";
import FirebaseFileList from "./systems/UploadSystem/VerificationSystem/VerificationSystem";
import TranlationSystem from "./systems/UploadSystem/TranslationSystem/TranlationSystem";

import UserHome from './components/Users/UserHome';
import SavedArtciles from './components/Users/Pages/Saved';
import './App.css'
import UserProfile from "./systems/UploadSystem/Profile/UserProfile";
import Authors from "./pages/Authors/Authors";
import RecommendationSystem from "./components/RecommendationSystem/RecomendationSystem";
import AdminSystem from "./systems/AdminSystem/AdminSystem";
import AppNavigation from "./components/AppNav/AppNav";
import UploadGalleryItem from "./pages/Gallery/uploadArt/UploadGalleryItem";
import ArticlesList from "./pages/ArticlesList/ArticlesList";

import NotFound from "./pages/NotFound/NotFound";

import {httpsCallable} from "firebase/functions";
import LanguageWrapper from "./components/LanguageWrapper/LanguageWrapper";
import GigsPage from "./pages/GigsPage/GigsPage";
import GigDetailPage from "./pages/GigsPage/GigDetailPage";
import AdsPage from "./systems/ads/AdsPage";
import ReportedCommentsContainer from "./pages/CommentReportSystem/ReportedCommentsContainer";
import PartyAnnouncement from "./pages/party/PartyAnnouncement";
import PartyModal from "./pages/party/PartyModal";
import {fetchAndActivate, getValue} from "firebase/remote-config";

function App() {

    const [menuVisible, setMenuVisible] = useState(false);
    const placeholderRef = useRef(null);
    const [shouldShowModal, setShouldShowModal] = useState(false);

    const saveDeviceTokenFunction = httpsCallable(functions, 'saveDeviceToken');

    const saveDeviceToken = async (token) => {
        try {
            const result = await saveDeviceTokenFunction({token: token});
            console.log('Token saved:', result.data);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };


    async function requestPermission() {
        try {
            //requesting permission using Notification API
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: "BHbCF6XioBa1F2fLgx7jKudN96QxN8iPlRJsBO4I_lTUipyeBwu7bE3Qee9QU56J873zSGEKpwn2BM8srjC14UQ",
                });

                //We can send token to server
                console.log("Token generated : ", token);

                await saveDeviceToken(token);

            }
        } catch (e) {
            console.error("Error requesting permission: ", e);
        }
    }




    useEffect(() => {
        requestPermission().then();


        fetchAndActivate(config).then(()=>{
            try {
                const serverLanguages = getValue(config, "showModal").asString();
                console.log(serverLanguages)
                setShouldShowModal(JSON.parse(serverLanguages).party);
            }catch (e) {
                console.log(e);
            }
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setMenuVisible(!entry.isIntersecting);
            },
            {threshold: [0]}
        );

        const currentPlaceholder = placeholderRef.current;

        if (placeholderRef.current) {
            observer.observe(currentPlaceholder);
        }

        return () => {
            if (currentPlaceholder) {
                observer.unobserve(currentPlaceholder);
            }
        };
    }, []);

    const getRoutes= (langPathShouldExist)=>{
        return(
            <Route path={langPathShouldExist?"/:lang":"/"} element={<LanguageWrapper />}>
                <Route path='' element={<Home/>}/>
                <Route path='articles-page' element={<ArticlesList/>}/>
                <Route path='Art-Gallery-page' element={<Gallery/>}/>
                <Route path='legends-2-archive' element={<LegendV0L2/>}/>
                <Route path='Falooda-interview-archive' element={<Primordial/>}/>
                <Route path='Holler-interview-archive' element={<HollerInterview/>}/>
                <Route path='Khavar-interview-archive' element={<KhavarInterview/>}/>
                <Route path='Acid-Mammoth-interview-archive' element={<AcidMamoth/>}/>
                <Route path='legends-5-archive' element={<GeorgeKollias/>}/>
                <Route path='article/:name' element={<DefaultArticle earlyAccess={false}/>}/>
                <Route path='article/early/:name' element={<DefaultArticle earlyAccess={true}/>}/>
                <Route path='about-us' element={<Authors/>}/>
                <Route path='recommended' element={<RecommendationSystem/>}/>
                <Route path='admin' element={<AdminSystem/>}/>
                <Route path='gallery/upload' element={<UploadGalleryItem/>}/>
                <Route path='upload' element={<ArticleUpload/>}/>
                <Route path='upload/register' element={<Register/>}/>
                <Route path='profile' element={<UserProfile/>}/>
                <Route path='upload/admin' element={<FirebaseFileList/>}/>
                <Route path='upload/login' element={<Login admin={false}/>}/>
                <Route path='upload/admin/login' element={<Login admin={true}/>}/>
                <Route path='upload/translation' element={<TranlationSystem/>}/>
                <Route path='User/login' element={<Login admin={false}/>}/>
                <Route path='User/register' element={<Register/>}/>
                <Route path='User/home' element={<UserHome/>}/>
                <Route path='User/Saved' element={<SavedArtciles/>}/>
                <Route path='author/:authorCode' element={<ArticlesList/>}/>
                <Route path={"404"} element={<NotFound/>}/>
                <Route path="gigs" element={<GigsPage />} />
                <Route path="gigs/:date" element={<GigDetailPage />} />
                <Route path="ads" element={<AdsPage/>} />
                <Route path="admin/comments" element={<ReportedCommentsContainer/>} />
                <Route path="party" element={<PartyAnnouncement/>} />
            </Route>
        )
    }


    return (
        <BrowserRouter>
        <div className="d-flex flex-column h-100">
            {shouldShowModal&&<PartyModal/>}
            <div ref={placeholderRef} style={{height: '1px'}}></div>
            <div className="flex-grow-1">
                <NotificationToast/>
                <AppNavigation menuVisible={menuVisible}/>

                <Routes>
                    {getRoutes(true)}
                    {getRoutes(false)}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </div>
            {/**
             Ραδιόφωνο. Το πας όπου θες
             **/}

            {/** <Footer footerVisible={menuVisible}/> */}
        </div>
        </BrowserRouter>
    );
}


export default App;
