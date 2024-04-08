import React, { useState, useEffect } from 'react';
import './PWA.css'


function InstallButton() {
const [deferredPrompt, setDeferredPrompt] = useState(null);

useEffect(() => {
 const handleBeforeInstallPrompt = (event) => {
   event.preventDefault();
  setDeferredPrompt(event);
 };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

 return () => {
 window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
 }, []);

const installApp = () => {
 if (deferredPrompt) {
   deferredPrompt.prompt();
 deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the installation');
  } else {
    console.log('User dismissed the installation');
   }
     });
  }
 };

 return (
  <>
  <hr className='bg-white' />
  <h4 className='m-2 Install'>HEAVY LOCAL MOBILE APP HERE:</h4>
  <hr className='bg-white' />
  <button className='InstallButton' onClick={installApp}>
    Install App
  </button>

  </>
);
}

export default InstallButton;
