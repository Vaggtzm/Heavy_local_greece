import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken } from "firebase/messaging";
import { useEffect , useState } from "react";
import { Route, Routes } from 'react-router-dom';
import DefaultArticle from './components/GenericArticle/GenericArticle';
import NotificationToast from "./components/messaging/Message";
import { messaging } from './firebase';
import Articles from './pages/Articles/articles';
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

import UserLog from './components/Users/AUTH/userLog';
import UserRegister from './components/Users/AUTH/UserRegister';
import UserHome from './components/Users/UserHome';
import SavedArtciles from './components/Users/Pages/Saved';
import './App.css'
import UserProfile from "./components/UploadSystem/Profile/UserProfile";
import Authors from "./pages/Authors/Authors";
import RecommendationSystem from "./components/RecommendationSystem/RecomendationSystem";
import AdminSystem from "./components/AdminSystem/AdminSystem";
function App() {
    const [loading, setLoading] = useState(false);

    const malakatino = true;

    const saveDeviceToken = async (token) => {
        try {
            const response = await fetch('/save_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
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
            setLoading(false);

        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);



return (
        <>
            {(process.env.NODE_ENV === 'development'&&malakatino) && (
                <b style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '25vh',
                    color: 'rgba(255, 0, 0, 0.6)', // Light grey color
                    zIndex: 1000, // Ensure it stays in the background
                    pointerEvents: 'none', // Make it non-interactive
                    userSelect: 'none', // Prevent text selection
                }} className={"rotate-90"}>
                    Vaggelis, you are an idiot
                </b>
            )}
            <NotificationToast/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/articles-page' element={<Articles/>}/>
                <Route path='/Art-Gallery-page' element={<Gallery/>}/>
                <Route path='/legends-2-archive' element={<LegendV0L2/>}/>
                <Route path='/Falooda-interview-archive' element={<Primordial/>}/>
                <Route path='/Holler-interview-archive' element={<HollerInterview/>}/>
                <Route path='/Khavar-interview-archive' element={<KhavarInterview/>}/>
                <Route path='/Acid-Mammoth-interview-archive' element={<AcidMamoth/>}/>
                <Route path='/legends-5-archive' element={<GeorgeKollias/>}/>

                <Route path='/article/:name' element={<DefaultArticle earlyAccess={false}/>}/>
                <Route path='/article/early/:name' element={<DefaultArticle earlyAccess={true}/>}/>
                <Route path='/article/early/:name' element={<DefaultArticle earlyAccess={true}/>}/>

                <Route path='/about-us' element={<Authors/>}/>
                <Route path='/recommended' element={<RecommendationSystem/>}/>
                <Route path='/admin' element={<AdminSystem/>}/>

                <Route path='/upload' element={<ArticleUpload/>}/>
                <Route path='/upload/register' element={<Register/>}/>
                <Route path='/upload/profile' element={<UserProfile/>}/>
                <Route path='/upload/admin' element={<FirebaseFileList/>}/>
                <Route path='/upload/login' element={<Login admin={false}/>}/>
                <Route path='/upload/admin/login' element={<Login admin={true}/>}/>
                <Route path='/upload/translation' element={<TranlationSystem/>}/>
                <Route path='/User/login' element={<UserLog />}/>
                <Route path='/User/register' element={<UserRegister />}/>
                <Route path='/User/home' element={<UserHome />}/>
                <Route path='/User/Saved' element={<SavedArtciles />}/>
            </Routes>
        </>
    );
}


export default App;
