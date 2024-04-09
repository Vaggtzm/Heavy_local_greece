import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles/articles';
import Gallery from './pages/Gallery/Gallery';
import ChronicleVOL2 from './pages/articles/chronicle-02';
import LegendV0L2 from './pages/articles/Aleah';
import LegendVOl3 from './pages/articles/Legends-4'
import DefaultArticle from './compoments/GenericArticle/GenericArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vertigo from './pages/articles/Vertigo-archive';
import Primordial from './pages/articles/Primordial-black-interview';
import GeorgeKollias from './pages/articles/GeorgeKollias';
import AutumnMachinery from './pages/articles/AutumnMachinery';
import ShadowsDance from './pages/articles/ShadowsDance';
import HollerInterview from './pages/articles/Interviews/Holler';
import KhavarInterview from './pages/articles/Interviews/Khavar';
import AcidMamoth from './pages/articles/Interviews/AcidMamoth';
import {messaging} from './firebase';
import {useEffect} from "react";
import {getToken} from "firebase/messaging";
import NotificationToast from "./compoments/messaging/Message";
import SignUp from './pages/Users/SignUp';
function App() {


    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: "BHbCF6XioBa1F2fLgx7jKudN96QxN8iPlRJsBO4I_lTUipyeBwu7bE3Qee9QU56J873zSGEKpwn2BM8srjC14UQ",
            });

            //We can send token to server
            console.log("Token generated : ", token);
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
                <Route path='/Autumn-Machinery-archive' element={<AutumnMachinery/>}/>
                <Route path='/Shadows-dance-archive' element={<ShadowsDance/>}/>
                <Route path='/Falooda-interview-archive' element={<Primordial/>}/>
                <Route path='/Holler-interview-archive' element={<HollerInterview/>}/>
                <Route path='/Khavar-interview-archive' element={<KhavarInterview/>}/>
                <Route path='/Acid-Mammoth-interview-archive' element={<AcidMamoth/>}/>
                <Route path='/legends-5-archive' element={<GeorgeKollias/>}/>
                <Route path='/SignUp' element={<SignUp/>}/>

                <Route path='/article/:name' element={<DefaultArticle/>}/>

            </Routes>

        </>
    );
}

export default App;
