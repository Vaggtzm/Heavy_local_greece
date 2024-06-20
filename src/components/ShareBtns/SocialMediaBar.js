import React from 'react';
import {useTranslation} from 'react-i18next';
import {FacebookShareButton} from 'react-share';
import './css.css';

const SocialBar = () => {
    const { t } = useTranslation();

    const CurrentPage = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="social-bar">
            <FacebookShareButton url={CurrentPage}>
                {t('shareToFacebook')}
            </FacebookShareButton>
        </div>
    );
};

export default SocialBar;