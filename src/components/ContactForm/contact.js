import React from "react";
import {useTranslation} from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <>
            <form action="https://formspree.io/f/xnqejvjp" method="POST">
                <h4>{t('getInTouch')}</h4>
                <div className="form-group m-1">
                    <label htmlFor="exampleInputEmail1">{t('tellUsYourFeedback')}</label>
                    <input
                        type="text"
                        name="Subject"
                        className="form-control m-1 p-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t('subjectPlaceholder')}
                    />
                    <small id="emailHelp" className="form-text text-muted m-1 p-2">
                        {t('emailHelp')}
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control m-1 p-2"
                        name="Message"
                        id="exampleInputPassword1"
                        placeholder={t('messagePlaceholder')}
                    />
                </div>
                <button type="submit" className="btn btn-primary m-1 p-2 w-100">{t('submit')}</button>
            </form>
        </>
    );
};

export default Contact;
