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

// LanguageModal.js
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import useNavigate from "../LanguageWrapper/Navigation";

const LanguageModal = ({ show, handleClose, targetLink, languages, siteLanguage, articleLanguage }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleYes = () => {
        navigate(targetLink);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"bg-dark text-white"} closeButton>
                <Modal.Title>{t('article-language.changeLanguageTitle')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-dark text-white"}>
                {t('article-language.languageMismatch', { siteLanguage: languages[siteLanguage], articleLanguage: languages[articleLanguage]})}
            </Modal.Body>
            <Modal.Footer className={"bg-dark text-white"}>
                <Button variant="secondary" onClick={handleClose}>
                    {t('article-language.no')}
                </Button>
                <Button variant="primary" onClick={handleYes}>
                    {t('article-language.yes')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LanguageModal;
