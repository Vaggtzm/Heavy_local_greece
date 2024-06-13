import React, { useState, useEffect } from 'react';
import './PWA.css';

function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the device width is less than 768px
        const checkIsMobile = () => {
            return window.innerWidth < 768;
        };

        setIsMobile(checkIsMobile());

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

    if (!isMobile) {
        return null; // Don't render the component if not on a mobile device
    }

    return (
        <div className='nav-link text-white link' onClick={installApp}>
            Mobile App
        </div>
    );
}

export default InstallButton;

