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

import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {config} from "../../../firebase";
import WorldFlag from 'react-world-flags';

const LanguageButtons = () => {

    const [languages, setLanguages] = useState([]);
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then();
    };

    useEffect(() => {

        try {
            fetchAndActivate(config).then(() => {
                setLanguages(JSON.parse(getValue(config, "languagesFlags").asString()));
            })
            console.log(i18n.language)
        } catch (err) {
            console.log(err);
        }
    },[]);

    return (
        <div className="language-switcher">
            {
                Object.keys(languages).map((lang, index) => {
                    const active = ((i18n.language === lang) ? "bg-primary-subtle " : "")
                    return (
                        <button key={index} className={"btn " + active}
                                onClick={() => changeLanguage(lang)}>
                            <WorldFlag code={languages[lang]}
                                       style={{width: '4vh', height: 'auto'}}/>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default LanguageButtons;