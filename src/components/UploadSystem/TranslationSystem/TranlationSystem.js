import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, FormGroup, ListGroup, Modal} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';
import {auth, config, database, storage} from '../../../firebase';
import {signOut} from 'firebase/auth';
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {onValue, ref as databaseRef} from "firebase/database";
import fetchArticlesCategory from "../articleData/articleData";
import {useTranslation} from "react-i18next";

import {ref as StorageRef, uploadString} from "firebase/storage";

const TranslationSystem = () => {
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);
    const [isEarlyReleasedArticles, setIsEarlyReleasedArticles] = useState([]);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [sortByDate, setSortByDate] = useState(false);
    const [user, setUser] = useState(null);
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {},
        lang: '',
        authorName: '',
    });
    const [translationData, setTranslationData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        translations: {},
        authorName: '',
    });
    const [newLanguage, setNewLanguage] = useState('en');
    const [originalLanguage, setOriginalLanguage] = useState('');
    const [availableLanguages, setAvailableLanguages] = useState({});

    useEffect(() => {
        const roles = databaseRef(database, "/roles");
        onValue(roles, async (snapshot) => {
            const roles = snapshot.val();

            try {
                await fetchAndActivate(config);
            } catch (err) {
                console.log(err);
            }
            const serverLanguages = getValue(config, "languages").asString();
            setAvailableLanguages(JSON.parse(serverLanguages));

            const userList = [...Object.values(roles.translationSystem), ...Object.values(roles.admin)];
            console.log(userList);
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user && userList.includes(user.email)) {
                    setUser(user);
                } else {
                    navigate('/upload');
                    signOut(auth).then();
                }
            });

            fetchFiles();

            return () => unsubscribe();
        });
    }, [navigate]);

    const fetchFiles = () => {
        try {
            fetchArticlesCategory('upload_from_authors', setEarlyReleasesError, setAlreadyPublishedError, setError, 20).then((publishedFilesData) => {
                setFiles(publishedFilesData);
                console.log("Finished upload_from_authors");
            });

            fetchArticlesCategory('articles', setEarlyReleasesError, setAlreadyPublishedError, setError, 20).then((publishedFilesData2) => {
                setAlreadyPublishedArticles(publishedFilesData2);
                console.log("Finished articles");
            });

            fetchArticlesCategory('early_releases', setEarlyReleasesError, setAlreadyPublishedError, setError, 20).then((publishedFilesData3) => {
                setEarlyReleasedArticles(publishedFilesData3);
                console.log("Finished early_releases");
            });
        } catch (error) {
            console.error(error);
        }
    };

    const replaceSpecialCharsWithDashes = (text) => {
        const regex = /[^a-zA-Z0-9-\u0370-\u03FF\u1F00-\u1FFF]/g;
        return text.replace(regex, '-');
    };

    const handleSave = async () => {
        let originalFolder, translationFolder;
        if (isAlreadyPublished) {
            originalFolder = `articles`;
        } else if (isEarlyReleasedArticles) {
            originalFolder = `early_releases`;
        } else {
            originalFolder = `upload_from_authors`;
        }

        translationFolder = `upload_from_authors`;

        if (!selectedFile || !fileData) return;

        let newFileName = selectedFile.name;
        let fileRef;
        let translationFileRef;

        fileData.translatedBy = user.uid;

        if (!fileData.translations) {
            fileData.translations = {};
        }

        if (isTranslating) {
            newFileName = `${replaceSpecialCharsWithDashes(translationData.title.replace(/\s+/g, ''))}-${newLanguage}.json`;

            fileRef = StorageRef(storage,`${translationFolder}/${newFileName}`);
            translationFileRef = StorageRef(storage,`${originalFolder}/${selectedFile.name}`);

            fileData.translations[newLanguage] = newFileName;
            fileData.translations[originalLanguage] = selectedFile.name;
            fileData.lang = originalLanguage;

            translationData.translations = fileData.translations;
            translationData.lang = newLanguage;
            translationData.translations[originalLanguage] = selectedFile.name;

            await uploadString(fileRef, JSON.stringify(translationData));

            const relatedTranslations = { ...fileData.translations, [newLanguage]: newFileName };

            await Promise.all(
                Object.keys(relatedTranslations).map(async (lang) => {
                    const relatedFileName = relatedTranslations[lang];
                    if (relatedFileName === newFileName) return;
                    const relatedFileRef = StorageRef(storage,`${originalFolder}/${relatedFileName}`);

                    try {
                        const downloadUrl = await relatedFileRef.getDownloadURL();
                        const fileContent = await fetch(downloadUrl).then((res) => res.json());
                        fileContent.translations[newLanguage] = newFileName;
                        await uploadString(relatedFileRef, JSON.stringify(fileContent));
                    } catch (e) {
                        console.error(`Failed to update related file ${relatedFileName}: `, e);
                    }
                })
            );
        } else {
            fileRef = StorageRef(storage,`${originalFolder}/${selectedFile.name}`);
        }

        const contentToSave = isTranslating ? translationData : fileData;
        contentToSave.content = contentToSave.content.replaceAll('<p>', "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'");

        await uploadString(fileRef, JSON.stringify(contentToSave));

        if (!isTranslating) {
            await uploadString(StorageRef(storage,`${originalFolder}/${selectedFile.name}`), JSON.stringify(fileData));
        }

        if (isTranslating) {
            await uploadString(translationFileRef, JSON.stringify(fileData));
        }

        const updatedFiles = files.map((file) =>
            file.name === selectedFile.name ? { ...file, fileContent: fileData } : file
        );
        setFiles(updatedFiles);

        setShowModal(false);
        fetchFiles();

        setTranslationData({
            content: '',
            title: '',
            details: '',
            Socials: '',
            img01: '',
            sub: '',
            date: '',
            translations: {},
            authorName: '',
        });
    };

    const handleTranslate = (file, isAlreadyPub, isEarlyReleased) => {
        setSelectedFile(file);
        setFileData({ ...file.fileContent });
        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);
        setTranslationData({ ...file.fileContent });
        setIsTranslating(true);
        setOriginalLanguage(file.fileContent.lang);

        // Fetch author name based on 'sub' from database
        if (file.fileContent.sub) {
            const authorRef = databaseRef(database,`authors/${file.fileContent.sub}`);
            console.log("Hello", `authors/${file.fileContent.sub}`);
            onValue(authorRef, (snapshot) => {
                const authorData = snapshot.val();
                if (authorData && authorData.displayName) {
                    setFileData(prevData => ({
                        ...prevData,
                        authorName: authorData.displayName
                    }));
                    setTranslationData(prevData => ({
                        ...prevData,
                        authorName: authorData.displayName
                    }));
                }
            });
        }
    };

    const handleTranslationChange = (value, field) => {
        setTranslationData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const sortFilesByDate = (files) => {
        return files.sort((a, b) => {
            const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
            const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
            return dateB - dateA;
        });
    };

    const handleShowList = (files, isEarlyRelease, isAlreadyPublished) => {

        const sortedFiles = sortByDate ? sortFilesByDate([...files]) : files;

        console.log(sortByDate);

        return (
            <ListGroup>
                {sortedFiles.map((file, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-light">
                        {file.fileContent.isReady && <><i className="text-success fa-solid fa-check"></i><span> </span></>}<p
                        key={file.fileContent.date}
                        className="form-label badge bg-dark-subtle text-dark m-1">{file.fileContent.date}</p>{file.fileContent.title}
                        {
                            (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                <div>
                                    {Object.keys(file.fileContent.translations).map((lang) => (
                                        <p key={lang} className={`form-label badge text-dark m-1 ${lang === file.fileContent.lang ? 'bg-warning-subtle' : 'bg-dark-subtle'}`}>
                                            {availableLanguages[lang]}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p>{t("noTranslationsAvailable")}</p>
                            )
                        }
                        <Button variant="warning" onClick={() => handleTranslate(file, isAlreadyPublished, isEarlyRelease)}>
                            {t("translate")}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    };

    return (
        <div className="container">
            <div className="m-3 p-3 border">
                <h1 className="m-3 text-center text-white">{t("Translation System")}</h1>
                <div className="row">
                    <div className="col-lg-4">
                        <Button className="btn btn-light m-3" onClick={() => {
                            setSortByDate(!sortByDate);
                        }}>
                            {sortByDate ? t("default") : t("Sort by date")}
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="text-center text-white">{t("uploadedFiles")}</h3>
                        {files.length > 0 ? handleShowList(files, false, false) :
                            <Alert>{error ? error : t("No articles in this category")}</Alert>}
                    </div>
                    <div className="col-lg-12">
                        <h3 className="text-center text-white">{t("earlyReleases")}</h3>
                        {earlyReleasedArticles.length > 0 ? handleShowList(earlyReleasedArticles, true, false) :
                            <Alert>{earlyReleasesError ? earlyReleasesError : t("No articles in this category")}</Alert>}
                    </div>
                    <div className="col-lg-12">
                        <h3 className="text-center text-white">{t("alreadyPublished")}</h3>
                        {alreadyPublishedArticles.length > 0 ? handleShowList(alreadyPublishedArticles, false, true) :
                            <Alert>{alreadyPublishedError ? alreadyPublishedError : t("No articles in this category")}</Alert>}
                    </div>
                </div>
            </div>
            <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Translation Modal")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <h5>{t('translate')}</h5>
                            <FormGroup controlId="translatedContent">
                                <Form.Label>{t('Content')}</Form.Label>
                                <ReactQuill theme="snow" value={translationData.content}
                                            onChange={(value) => handleTranslationChange(value, 'content')} readOnly={!isTranslating}/>
                            </FormGroup>
                            <FormGroup controlId="translatedTitle">
                                <Form.Label>{t('Title')}</Form.Label>
                                <Form.Control type="text" value={translationData.title}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'title')} readOnly={!isTranslating}/>
                            </FormGroup>
                            <FormGroup controlId="translatedDetails">
                                <Form.Label>{t('Details')}</Form.Label>
                                <Form.Control type="text" value={translationData.details}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'details')} readOnly={!isTranslating}/>
                            </FormGroup>
                            <FormGroup controlId="translatedImg01">
                                <Form.Label>{t('ImgUrl')}</Form.Label>
                                <Form.Control type="text" value={translationData.img01}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'img01')} readOnly={true}/>
                            </FormGroup>
                            <FormGroup controlId="translatedSub">
                                <Form.Label>{t('AuthorCode')} {fileData.authorName}</Form.Label>
                                <Form.Control type="text" value={fileData.sub} readOnly={true}/>
                            </FormGroup>
                            <FormGroup controlId="translatedDate">
                                <Form.Label>{t('Date')}</Form.Label>
                                <Form.Control type="text" value={translationData.date}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'date')} readOnly={true}/>
                            </FormGroup>
                            {isTranslating && (
                                <FormGroup controlId="translatedLanguage">
                                    <Form.Label>{t('translatedLanguageLabel')}</Form.Label>
                                    <Form.Control as="select" value={newLanguage}
                                                  onChange={(e) => setNewLanguage(e.target.value)}>
                                        <option value="">{t('selectLanguagePlaceholder')}</option>
                                        {Object.keys(availableLanguages).map((lang) => (
                                            <option key={lang} value={lang}>{availableLanguages[lang]}</option>
                                        ))}
                                    </Form.Control>
                                </FormGroup>
                            )}
                        </div>
                        <Button className="btn btn-dark m-3" onClick={handleSave}>{t("Save")}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TranslationSystem;
