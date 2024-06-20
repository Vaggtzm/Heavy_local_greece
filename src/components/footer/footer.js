import React from "react";
import {useTranslation} from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-black text-light pt-4">
            <div className="container overflow-hidden">
                <div className="row">
                    <div className="col-4">
                        <h5>{t('allRightsReserved')}</h5>
                        <p>{t('pulseOfTheUnderground')}</p>
                    </div>
                    <div className="col-4">
                        <h5 className="text-center">{t('developedBy')}</h5>
                        <p className="text-center">
                            Vaggelis Tzimas and <a className="nav-link text-info" href="https://pavlos.orfanidis.net.gr">Pavlos Orfanidis</a>
                        </p>
                    </div>
                    <div className="col-4">
                        <h5>{t('helpUsToGrow')}</h5>
                        <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-100">{t('donate')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
