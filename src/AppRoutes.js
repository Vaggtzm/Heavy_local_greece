/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { lazy, Suspense} from 'react';
import {Route} from "react-router-dom";
import LanguageWrapper from "./components/LanguageWrapper/LanguageWrapper";

// Lazy load components
const DefaultArticle = lazy(() => import('./components/GenericArticle/GenericArticle'));

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
const RecommendationSystem = lazy(() => import("./components/RecommendationSystem/RecomendationSystem"));
const AdminSystem = lazy(() => import("./systems/AdminSystem/AdminSystem"));
const UploadGalleryItem = lazy(() => import("./pages/Gallery/uploadArt/UploadGalleryItem"));
const ArticlesList = lazy(() => import("./pages/ArticlesList/ArticlesList"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const GigsPage = lazy(() => import("./pages/GigsPage/GigsPage"));
const GigDetailPage = lazy(() => import("./pages/GigsPage/GigDetailPage"));
const AdsPage = lazy(() => import("./systems/ads/AdsPage"));
const ReportedCommentsContainer = lazy(() => import("./pages/CommentReportSystem/ReportedCommentsContainer"));
const NotificationsPage = lazy(() => import("./pages/Notifications/NotificationsPage"));
const Youtube = lazy(() => import("./components/YoutubeAPI/Youtube"));


export const getRoutes = (langPathShouldExist, menuVisible) => {
    return (
        <Route path={langPathShouldExist ? "/:lang" : "/"} element={<LanguageWrapper />}>
            <Route path='' element={<Suspense fallback={<div>Loading...</div>}><Home isMenuVisible={menuVisible} /></Suspense>} />
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
            <Route path="youtube" element={<Suspense fallback={<div>Loading...</div>}><Youtube /></Suspense>} />
            <Route path="notifications" element={<Suspense fallback={<div>Loading...</div>}><NotificationsPage /></Suspense>} />
        </Route>
    );
};