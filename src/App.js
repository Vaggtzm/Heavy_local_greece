import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getToken } from "firebase/messaging";
import { httpsCallable } from "firebase/functions";
import { signOut } from "firebase/auth";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { auth, config, functions, messaging } from './firebase';
import useNavigate from "./components/LanguageWrapper/Navigation";
import LanguageWrapper from "./components/LanguageWrapper/LanguageWrapper";
import AppNavigation from "./components/AppNav/AppNav";

// Lazy load components
const DefaultArticle = lazy(() => import('./components/GenericArticle/GenericArticle'));
const NotificationToast = lazy(() => import("./components/messaging/Message"));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Home = lazy(() => import('./pages/Home'));
const LegendV0L2 = lazy(() => import('./pages/articles/Aleah'));
const GeorgeKollias = lazy(() => import('./pages/articles/GeorgeKollias'));
const AcidMamoth = lazy(() => import('./pages/articles/Interviews/AcidMamoth'));
const HollerInterview = lazy(() => import('./pages/articles/Interviews/Holler'));
const KhavarInterview = lazy(() => import('./pages/articles/Interviews/Khavar'));
const Primordial = lazy(() => import('./pages/articles/Primordial-black-interview'));
const ArticleUpload = lazy(() => import("./systems/UploadSystem/UploadSystem"));
const Login = lazy(() => import("./systems/UploadSystem/Login/Login"));
const Register = lazy(() => import("./systems/UploadSystem/Register/Register"));
const FirebaseFileList = lazy(() => import("./systems/UploadSystem/VerificationSystem/VerificationSystem"));
const TranlationSystem = lazy(() => import("./systems/UploadSystem/TranslationSystem/TranlationSystem"));
const UserHome = lazy(() => import('./components/Users/UserHome'));
const SavedArtciles = lazy(() => import('./components/Users/Pages/Saved'));
const UserProfile = lazy(() => import("./systems/UploadSystem/Profile/UserProfile"));
const Authors = lazy(() => import("./pages/Authors/Authors"));
const RecommendationSystem = lazy(() => import("./components/RecommendationSystem/RecomendationSystem"));
const AdminSystem = lazy(() => import("./systems/AdminSystem/AdminSystem"));
const UploadGalleryItem = lazy(() => import("./pages/Gallery/uploadArt/UploadGalleryItem"));
const ArticlesList = lazy(() => import("./pages/ArticlesList/ArticlesList"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const GigsPage = lazy(() => import("./pages/GigsPage/GigsPage"));
const GigDetailPage = lazy(() => import("./pages/GigsPage/GigDetailPage"));
const AdsPage = lazy(() => import("./systems/ads/AdsPage"));
const ReportedCommentsContainer = lazy(() => import("./pages/CommentReportSystem/ReportedCommentsContainer"));

function App() {
    const [menuVisible, setMenuVisible] = useState(false);
    const placeholderRef = useRef(null);
    const [shouldShowModal, setShouldShowModal] = useState(false);

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

        fetchAndActivate(config).then(() => {
            try {
                const serverLanguages = getValue(config, "showModal").asString();
                console.log(serverLanguages);
                setShouldShowModal(JSON.parse(serverLanguages).party);
            } catch (e) {
                console.log(e);
            }
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

    const getRoutes = (langPathShouldExist) => {
        return (
            <Route path={langPathShouldExist ? "/:lang" : "/"} element={<LanguageWrapper />}>
                <Route path='' element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
                <Route path='articles-page' element={<Suspense fallback={<div>Loading...</div>}><ArticlesList /></Suspense>} />
                <Route path='Art-Gallery-page' element={<Suspense fallback={<div>Loading...</div>}><Gallery /></Suspense>} />
                <Route path='legends-2-archive' element={<Suspense fallback={<div>Loading...</div>}><LegendV0L2 /></Suspense>} />
                <Route path='Falooda-interview-archive' element={<Suspense fallback={<div>Loading...</div>}><Primordial /></Suspense>} />
                <Route path='Holler-interview-archive' element={<Suspense fallback={<div>Loading...</div>}><HollerInterview /></Suspense>} />
                <Route path='Khavar-interview-archive' element={<Suspense fallback={<div>Loading...</div>}><KhavarInterview /></Suspense>} />
                <Route path='Acid-Mammoth-interview-archive' element={<Suspense fallback={<div>Loading...</div>}><AcidMamoth /></Suspense>} />
                <Route path='legends-5-archive' element={<Suspense fallback={<div>Loading...</div>}><GeorgeKollias /></Suspense>} />
                <Route path='article/:name' element={<Suspense fallback={<div>Loading...</div>}><DefaultArticle earlyAccess={false} /></Suspense>} />
                <Route path='article/early/:name' element={<Suspense fallback={<div>Loading...</div>}><DefaultArticle earlyAccess={true} /></Suspense>} />
                <Route path='about-us' element={<Suspense fallback={<div>Loading...</div>}><Authors /></Suspense>} />
                <Route path='recommended' element={<Suspense fallback={<div>Loading...</div>}><RecommendationSystem /></Suspense>} />
                <Route path='admin' element={<Suspense fallback={<div>Loading...</div>}><AdminSystem /></Suspense>} />
                <Route path='gallery/upload' element={<Suspense fallback={<div>Loading...</div>}><UploadGalleryItem /></Suspense>} />
                <Route path='upload' element={<Suspense fallback={<div>Loading...</div>}><ArticleUpload /></Suspense>} />
                <Route path='upload/register' element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
                <Route path='profile' element={<Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>} />
                <Route path='upload/admin' element={<Suspense fallback={<div>Loading...</div>}><FirebaseFileList /></Suspense>} />
                <Route path='upload/login' element={<Suspense fallback={<div>Loading...</div>}><Login admin={false} /></Suspense>} />
                <Route path='upload/admin/login' element={<Suspense fallback={<div>Loading...</div>}><Login admin={true} /></Suspense>} />
                <Route path='upload/translation' element={<Suspense fallback={<div>Loading...</div>}><TranlationSystem /></Suspense>} />
                <Route path='User/login' element={<Suspense fallback={<div>Loading...</div>}><Login admin={false} /></Suspense>} />
                <Route path='User/register' element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
                <Route path='User/home' element={<Suspense fallback={<div>Loading...</div>}><UserHome /></Suspense>} />
                <Route path='User/Saved' element={<Suspense fallback={<div>Loading...</div>}><SavedArtciles /></Suspense>} />
                <Route path='author/:authorCode' element={<Suspense fallback={<div>Loading...</div>}><ArticlesList /></Suspense>} />
                <Route path={"404"} element={<Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>} />
                <Route path="gigs" element={<Suspense fallback={<div>Loading...</div>}><GigsPage /></Suspense>} />
                <Route path="gigs/:date" element={<Suspense fallback={<div>Loading...</div>}><GigDetailPage /></Suspense>} />
                <Route path="ads" element={<Suspense fallback={<div>Loading...</div>}><AdsPage /></Suspense>} />
                <Route path="admin/comments" element={<Suspense fallback={<div>Loading...</div>}><ReportedCommentsContainer /></Suspense>} />
            </Route>
        );
    };

    return (
        <div className="d-flex flex-column h-100">
            <div ref={placeholderRef} style={{ height: '1px' }}></div>
            <div className="flex-grow-1">
                <Suspense fallback={<div>Loading...</div>}>
                    <NotificationToast />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppNavigation menuVisible={menuVisible} />
                </Suspense>
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
