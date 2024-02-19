import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
import Home from './pages/Home';
import Articles from './pages/Articles/articles';
import Gallery from './pages/Gallery/Gallery';
import Lioneye from './pages/articles/lioneye';
import StartTheMonkey from './pages/articles/StM';
import ScentOfThorns from './pages/articles/Scent';
import Infliction from './pages/articles/infliction';
import Yothiria from './pages/articles/yothiria';
import Vapa from './pages/articles/vapa';
import Reka from './pages/articles/reka';
import Klage from './pages/articles/klage';
import Akral from './pages/articles/akral';
import Chronicle01 from './pages/articles/chronicle-01';
import Asomata from './pages/articles/Asomata';
import Order from './pages/articles/order';
import Summit from './pages/articles/summit';
import Tortuga from './pages/articles/tortuga';
import Interview from './pages/articles/TortugalIntrerview';
import Chronicle02 from './pages/articles/chronicle-02';
import Aleah from './pages/articles/Aleah';
import Liquify from './pages/articles/liquify';
import Prisson from './pages/articles/PrissonMassacre';
import SadoStathanas from './pages/articles/SadoSathanas';
import Funeral from './pages/articles/funeral';
import Aherusia from './pages/articles/Aherusia';
import DefaultArticle from './compoments/GenericArticle/GenericArticle';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBloW4BFTb3Q4RmW95ctPNAl67uh7h9G2M",
    authDomain: "heavylocal-2257a.firebaseapp.com",
    projectId: "heavylocal-2257a",
    storageBucket: "heavylocal-2257a.appspot.com",
    messagingSenderId: "352508897996",
    appId: "1:352508897996:web:ce85937a30f8cba8a53069",
    measurementId: "G-YF150V0NVQ"
  };
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);
  const messaging = getMessaging(firebaseApp);

  const [isTokenFound, setTokenFound] = useState(false);

  const requestForToken = () => {
    const getTokenFromFirebase = (messaging, options) => {
      return new Promise((resolve, reject) => {
        getToken(messaging, options)
          .then((currentToken) => {
            if (currentToken) {
              console.log('Current token for client:', currentToken);
              resolve(currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
              reject('No registration token available.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token:', err);
            reject(err);
          });
      });
    };

    getTokenFromFirebase(messaging, { vapidKey: 'BFbZvzUEREFgR5Seryh38Jlkv4HvLkxksKjjHHIpqeTl1R2heZiIjCzNFveG7q7iKvxgVwVs3HTPkXReJDAUrxI' })
      .then((currentToken) => {
        setTokenFound(true);
        // Additional logic if needed
      })
      .catch((err) => {
        setTokenFound(false);
        // Additional error handling if needed
      });
  };
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.error('ServiceWorker registration failed: ', err);
      });
    });
  }
  

  useEffect(() => {
    requestForToken();
  }, []);    
  return (
    <>
        <Routes>
      <Route path='/' element ={<Home notification={requestForToken}/>}/>
      <Route path='/articles-page' element={<Articles />} />
      <Route path='/Art-Gallery-page' element={<Gallery />} />
      <Route path='/lioneye-archive' element={<Lioneye/>}/>
      <Route path='/Start_the_monkey-archive' element={<StartTheMonkey />}/>
      <Route path='/Scent_of_thorns-archive' element={<ScentOfThorns />}/>
      <Route path='/Beasts_of_satan-archive' element={<Infliction/>}/>
      <Route path='/Yothiria_live_203-archive' element={<Yothiria />}/>
      <Route path='/Vapa_flawless_world-archive' element={<Vapa />}/>
      <Route path='/Reka-archive' element={<Reka />}/>
      <Route path='/Klage-archive' element={<Klage />}/>
      <Route path='/Akral-necrosis_archive' element={<Akral />}/>
      <Route path='/Chronicles_of_the_underworld_part01-archive' element={<Chronicle01 />}/>
      <Route path='/Order-Of-The-Ebon-Hand-archive' element={<Order />}/>
      <Route path='/Summit-catharsis-archive' element={<Summit />}/>
      <Route path='/Tortuga-Sacrifice-archive' element={<Tortuga />}/>
      <Route path='/Chronicles_of_the_underworld_vol-2_archive' element={<Chronicle02 />}/>
      <Route path='/legends-2-archive' element={<Aleah />}/>
      <Route path='/Liquify-archive' element={<Liquify />}/>
      <Route path='/The-Dark-Prison-Massacre-archive' element={<Prisson />}/>
      <Route path='/Totrugal-Sacrifice-Interview-archive' element={<Interview />}/>
      <Route path='/SadoSathanas-Review-archive' element={<SadoStathanas />}/>
      <Route path='/Asomata-Review-archive' element={<Asomata />}/>
      <Route path='/Funeral-chasm-review-archive' element={<Funeral/>}/>
      <Route path='/Αheusia-Bacchus-epiphanies-of-the-crazy-god-archive' element={<Aherusia/>}/>


      <Route path='/article/:name' element={<DefaultArticle/>}/>
      
    </Routes>

    </>
  );
}

export default App;
