import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getToken } from "firebase/messaging";
import { httpsCallable } from "firebase/functions";
import { signOut } from "firebase/auth";
import {app, auth, functions, messaging} from './firebase';
import useNavigate from "./components/LanguageWrapper/Navigation";
import AppNavigation from "./components/AppNav/AppNav";
import NotificationToast from "./components/messaging/Message";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";
import {getRoutes} from "./AppRoutes";


function App() {
    const [menuVisible, setMenuVisible] = useState(false);
    const placeholderRef = useRef(null);

    const saveDeviceTokenFunction = httpsCallable(functions, 'saveDeviceToken');
    const navigate = useNavigate();

    const saveDeviceToken = async (token) => {
        try {
            const result = await saveDeviceTokenFunction({ token });
            console.log('Token saved:', result.data);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                const token = await getToken(messaging, {
                    vapidKey: "BHbCF6XioBa1F2fLgx7jKudN96QxN8iPlRJsBO4I_lTUipyeBwu7bE3Qee9QU56J873zSGEKpwn2BM8srjC14UQ",
                });
                console.log("Token generated : ", token);
                await saveDeviceToken(token);
            }
        } catch (e) {
            console.error("Error requesting permission: ", e);
        }
    }

    useEffect(() => {
        requestPermission().then();
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider('6LdI_sMpAAAAADFJGDiXfkFW4VPap3M_YDFN2cwi'),
            isTokenAutoRefreshEnabled: true
        });
    }, []);

    useEffect(() => {
        const handleAuthStateChanged = (user) => {
            if (!user) {
                return; // User is not signed in
            }

            user.getIdTokenResult(true).catch((error) => {
                if (error.code === 'auth/id-token-expired') {
                    signOut(auth).then(() => {
                        console.log('User signed out due to token expiration.');
                        navigate("/User/login");
                    }).catch((signOutError) => {
                        console.error('Error signing out:', signOutError);
                    });
                }
            });
        };

        const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setMenuVisible(!entry.isIntersecting);
            },
            { threshold: [0] }
        );


        const currentPlaceholder = placeholderRef.current;

        if (currentPlaceholder) {
            observer.observe(currentPlaceholder);
        }

        return () => {
            if (currentPlaceholder) {
                observer.unobserve(currentPlaceholder);
            }
        };
    }, []);

    return (
        <div className="d-flex flex-column h-100">
            <div ref={placeholderRef} style={{ height: '1px' }}></div>
            <div className="flex-grow-1">
                <NotificationToast />
                <AppNavigation menuVisible={menuVisible} />
                <Routes>
                    {getRoutes(true)}
                    {getRoutes(false)}
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
