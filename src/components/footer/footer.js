import React from "react";
import {useTranslation} from 'react-i18next';
import "./footer.css";
import LanguageButtons from "../AppNav/Language/LanguageButtons";

const Footer = ({ footerVisible }) => {
    const { t } = useTranslation();

    return (
       <footer className={`footer w-100 bg-black text-light pt-4 sticky-bottom ${footerVisible ? 'visible' : 'hidden'}`}>
           <div className="d-flex align-items-start">
                <div className="me-auto">
                    <LanguageButtons />
                </div>
                <div className="flex-grow-1">
                    <div className="container d-flex justify-content-center">
                        <div className="row w-100">
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;
