import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, FormGroup, ListGroup, Modal} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {auth, config, database, storage} from '../../../firebase';
import {signOut} from 'firebase/auth';
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {onValue, ref as databaseRef} from "firebase/database";
import {useTranslation} from "react-i18next";

import {getDownloadURL, getMetadata, ref as storageRef, ref as StorageRef, uploadString} from "firebase/storage";
import {fetchFiles} from "../articleData/articleData";
import useNavigate from "../../LanguageWrapper/Navigation";

const TranslationSystem = () => {
    const {t} = useTranslation();
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
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

    const [loading, setLoading] = useState(true);

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

            fetchFiles((files) => {
                console.log(files);
                setFiles(files["upload_from_authors"]);
                setEarlyReleasedArticles(!files["early_releases"] ? [] : files["early_releases"]);
                setAlreadyPublishedArticles(files["articles"])
            }, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading).then();

            return () => unsubscribe();
        });
    }, []);

    const checkIfStorageRefExists = async (fileRef) => {

        try {
            await getMetadata(fileRef);
            return true;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                return false;
            } else {
                throw error;
            }
        }
    };


    const replaceSpecialCharsWithDashes = (text) => {
        const regex = /[^a-zA-Z0-9-\u0370-\u03FF\u1F00-\u1FFF]/g;
        return text.replace(regex, '-');
    };

    const updateotherTranslations = async (relatedFileRef, newFileName) => {
        const downloadUrl = await getDownloadURL(relatedFileRef);
        const fileContent = await fetch(downloadUrl).then((res) => res.json());
        fileContent.translations[newLanguage] = newFileName;
        await uploadString(relatedFileRef, JSON.stringify(fileContent));
    }

    const handleSave = async () => {

        const originalFolder = selectedFile.folder
        const translationFolder = `upload_from_authors`;

        if (!selectedFile || !fileData) return;

        let newFileName = selectedFile.name;
        let fileRef;
        let translationFileRef;
        fileData.translatedBy = user.uid;
        if (!fileData.translations) {
            fileData.translations = {};
        }

        newFileName = `${replaceSpecialCharsWithDashes(translationData.title.replace(/\s+/g, ''))}-${newLanguage}.json`;
        fileRef = StorageRef(storage, `${translationFolder}/${newFileName}`);
        translationFileRef = StorageRef(storage, `${originalFolder}/${selectedFile.name}.json`);
        fileData.translations[newLanguage] = newFileName;
        fileData.translations[originalLanguage] = selectedFile.name;
        fileData.lang = originalLanguage;
        translationData.translations = fileData.translations;
        translationData.lang = newLanguage;
        translationData.translations[originalLanguage] = selectedFile.name;
        await uploadString(fileRef, JSON.stringify(translationData));
        const relatedTranslations = {...fileData.translations, [newLanguage]: newFileName};
        await Promise.all(
            Object.keys(relatedTranslations).map(async (lang) => {
                const relatedFileName = relatedTranslations[lang];
                if (relatedFileName === newFileName) return;
                let relatedFileRef = StorageRef(storage, `upload_from_authors/${relatedFileName}.json`);
                if (await checkIfStorageRefExists(relatedFileRef)) {
                    await updateotherTranslations(relatedFileRef, newFileName);
                } else {
                    relatedFileRef = StorageRef(storage, `articles/${relatedFileName}.json`);
                    if (await checkIfStorageRefExists(relatedFileRef)) {
                        await updateotherTranslations(relatedFileRef, newFileName);
                    } else {
                        relatedFileRef = StorageRef(storage, `early_releases/${relatedFileName}.json`);
                        if (await checkIfStorageRefExists(relatedFileRef)) {
                            await updateotherTranslations(relatedFileRef, newFileName);
                        } else {
                            console.log("Not found")
                        }
                    }
                }
            })
        );

        const contentToSave = translationData;
        contentToSave.content = contentToSave.content.replaceAll('<p>', "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'");
        contentToSave.isReady = false;
        await uploadString(fileRef, JSON.stringify(contentToSave));


        await uploadString(translationFileRef, JSON.stringify(fileData));

        const updatedFiles = files.map((file) =>
            file.name === selectedFile.name ? {...file, fileContent: fileData} : file
        );

        console.log("UpdatedFiles", updatedFiles);

        updatedFiles.push({
            name: newFileName,
            fileContent: contentToSave
        })
        setFiles(updatedFiles);

        setShowModal(false);

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

    const handleTranslate = async (file, isAlreadyPub, isEarlyReleased) => {
        const articleRef = storageRef(storage, `${file.folder}/${file.name}.json`);
        const articleDownloadLink = await getDownloadURL(articleRef);
        const articleDataString = await fetch(articleDownloadLink);
        const fileData = await articleDataString.json();


        setSelectedFile(file);
        setFileData({...fileData});
        setShowModal(true);
        setTranslationData({...fileData});
        setOriginalLanguage(file.lang);

        // Fetch author name based on 'sub' from database
        if (fileData.sub) {
            const authorRef = databaseRef(database, `authors/${fileData.sub}`);
            console.log("Hello", `authors/${fileData.sub}`);
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
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
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
                        {file.isReady && <><i className="text-success fa-solid fa-check"></i><span> </span></>}<p
                        key={file.date}
                        className="form-label badge bg-dark-subtle text-dark m-1">{file.date}</p>{file.title}
                        {
                            (file.translations && Object.keys(file.translations).length > 0) ? (
                                <div>
                                    {Object.keys(file.translations).map((lang) => (
                                        <p key={lang}
                                           className={`form-label badge text-dark m-1 ${lang === file.lang ? 'bg-warning-subtle' : 'bg-dark-subtle'}`}>
                                            {availableLanguages[lang]}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p>{t("noTranslationsAvailable")}</p>
                            )
                        }
                        <Button variant="warning"
                                onClick={() => handleTranslate(file, isAlreadyPublished, isEarlyRelease)}>
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
                                            onChange={(value) => handleTranslationChange(value, 'content')}/>
                            </FormGroup>
                            <FormGroup controlId="translatedTitle">
                                <Form.Label>{t('Title')}</Form.Label>
                                <Form.Control type="text" value={translationData.title}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'title')}/>
                            </FormGroup>
                            <FormGroup controlId="translatedDetails">
                                <Form.Label>{t('Details')}</Form.Label>
                                <Form.Control type="text" value={translationData.details}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'details')}/>
                            </FormGroup>
                            <FormGroup controlId="translatedImg01">
                                <Form.Label>{t('ImgUrl')}</Form.Label>
                                <Form.Control type="text" value={translationData.img01}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'img01')}
                                              readOnly={true}/>
                            </FormGroup>
                            <FormGroup controlId="translatedSub">
                                <Form.Label>{t('AuthorCode')} {fileData.authorName}</Form.Label>
                                <Form.Control type="text" value={fileData.sub} readOnly={true}/>
                            </FormGroup>
                            <FormGroup controlId="translatedDate">
                                <Form.Label>{t('Date')}</Form.Label>
                                <Form.Control type="text" value={translationData.date}
                                              onChange={(e) => handleTranslationChange(e.target.value, 'date')}
                                              readOnly={true}/>
                            </FormGroup>
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
                        </div>
                        <Button className="btn btn-dark m-3" onClick={handleSave}>{t("Save")}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TranslationSystem;
