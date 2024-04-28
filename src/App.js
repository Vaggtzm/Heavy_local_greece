import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken } from "firebase/messaging";
import { useEffect , useState } from "react";
import { Route, Routes } from 'react-router-dom';
import DefaultArticle from './compoments/GenericArticle/GenericArticle';
import NotificationToast from "./compoments/messaging/Message";
import { messaging } from './firebase';
import Articles from './pages/Articles/articles';
import Gallery from './pages/Gallery/Gallery';
import Home from './pages/Home';
import LegendV0L2 from './pages/articles/Aleah';
import AutumnMachinery from './pages/articles/AutumnMachinery';
import GeorgeKollias from './pages/articles/GeorgeKollias';
import AcidMamoth from './pages/articles/Interviews/AcidMamoth';
import HollerInterview from './pages/articles/Interviews/Holler';
import KhavarInterview from './pages/articles/Interviews/Khavar';
import LegendVOl3 from './pages/articles/Legends-4';
import Primordial from './pages/articles/Primordial-black-interview';
import ShadowsDance from './pages/articles/ShadowsDance';
import Vertigo from './pages/articles/Vertigo-archive';
import ChronicleVOL2 from './pages/articles/chronicle-02';
import Loader from './compoments/PreLoader/PreLoader';
import ArticleUpload from "./compoments/UploadSystem/UploadSystem";
import Login from "./compoments/UploadSystem/Login/Login";
import Register from "./compoments/UploadSystem/Register/Register";
import FirebaseFileList from "./compoments/UploadSystem/VerificationSystem/VerificationSystem";
function App() {
    const [loading, setLoading] = useState(true);

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


    {/**firestore */
    }
    return (
        <>
            <NotificationToast/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/articles-page' element={<Articles/>}/>
                <Route path='/Art-Gallery-page' element={<Gallery/>}/>
                <Route path='/Chronicles_of_the_underworld_vol-2_archive' element={<ChronicleVOL2/>}/>
                <Route path='/legends-2-archive' element={<LegendV0L2/>}/>
                <Route path='/legends-4-archive' element={<LegendVOl3/>}/>
                <Route path='/Vertigo-archive' element={<Vertigo/>}/>
                <Route path='/Falooda-interview-archive' element={<Primordial/>}/>
                <Route path='/Holler-interview-archive' element={<HollerInterview/>}/>
                <Route path='/Khavar-interview-archive' element={<KhavarInterview/>}/>
                <Route path='/Acid-Mammoth-interview-archive' element={<AcidMamoth/>}/>
                <Route path='/legends-5-archive' element={<GeorgeKollias/>}/>
<<<<<<< Updated upstream
=======
                
                <Route path='/upload' element={<ArticleUpload/>}/>
                <Route path='/upload/register' element={<Register/>}/>
                <Route path='/upload/admin' element={<FirebaseFileList/>}/>
                <Route path='/upload/login' element={<Login admin={false}/>}/>
                <Route path='/upload/admin/login' element={<Login admin={true}/>}/>
>>>>>>> Stashed changes


                {/*Είναι 2 φορές. Μία για τα κανονικά και μία για τα early access*/}
                <Route path='/article/:name' element={<DefaultArticle earlyAccess={false}/>}/>
                <Route path='/article/early/:name' element={<DefaultArticle earlyAccess={true}/>}/>

                <Route path='/upload' element={<ArticleUpload/>}/>
                <Route path='/upload/register' element={<Register/>}/>
                <Route path='/upload/admin' element={<FirebaseFileList/>}/>
                <Route path='/upload/login' element={<Login admin={false}/>}/>
                <Route path='/upload/admin/login' element={<Login admin={true}/>}/>
            </Routes>

        </>
    );
}

export default App;
