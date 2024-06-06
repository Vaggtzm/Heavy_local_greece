import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    listAll,
    ref,
    uploadString,
} from 'firebase/storage';
import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Form,
    ListGroup,
    Modal,
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';
import {auth, config, database, storage} from '../../../firebase';
import Navigation from '../../AppNav/Navigation';
import {signOut} from 'firebase/auth';
import {fetchAndActivate, getValue} from "firebase/remote-config";
import UserNav from "../../Users/UserNav";
import {onValue, ref as databaseRef} from "firebase/database";
import fetchArticlesCategory from "../articleData/articleData";

const TranslationSystem = () => {
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);
    const [isEarlyReleasedArticles, setIsEarlyReleasedArticles] = useState([]);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [sortByDate, setSortByDate] = useState(false);
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
    });
    const [newLanguage, setNewLanguage] = useState('en');
    const [originalLanguage, setOriginalLanguage] = useState('');

    const [availableLanguages, setAvailableLanguages] = useState({});


    const fetchFiles = async () => {
        try {
            const publishedFilesData = await fetchArticlesCategory('upload_from_authors', setEarlyReleasesError, setAlreadyPublishedError, setError);
            setFiles(publishedFilesData);

            const publishedFilesData2 = await fetchArticlesCategory('articles', setEarlyReleasesError, setAlreadyPublishedError, setError);
            setAlreadyPublishedArticles(publishedFilesData2);

            const publishedFilesData3 = await fetchArticlesCategory('early_releases', setEarlyReleasesError, setAlreadyPublishedError, setError);
            setEarlyReleasedArticles(publishedFilesData3);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        const roles = databaseRef(database, "/roles");
        onValue(roles, async (snapshot) => {
            const roles = snapshot.val();

            try {
                await fetchAndActivate(config);
            } catch (err) {
                console.log(err);
            }
            const serverLanguages = getValue(config, "languages").asString()
            setAvailableLanguages(JSON.parse(serverLanguages))

            const userList = [...Object.values(roles.translationSystem), ...Object.values(roles.admin)];
            console.log(userList);
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user && userList.includes(user.email)) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                    navigate('/upload');
                    signOut(auth).then();
                }
            });

            await fetchFiles();

            return () => unsubscribe();
        });
    }, [navigate]);

    function replaceSpecialCharsWithDashes(text) {
        // Regular expression to match any character that is not alphanumeric or a dash
        const regex = /[^a-zA-Z0-9-\u0370-\u03FF\u1F00-\u1FFF]/g;
        // Replace matched characters with dashes
        return text.replace(regex, '-');
    }

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

        if (!fileData.translations) {
            fileData.translations = {};
        }

        if (isTranslating) {
            // Ensure the new translation file name is based on the translation data title
            newFileName = `${replaceSpecialCharsWithDashes(translationData.title.replace(/\s+/g, ''))}-${newLanguage}.json`;

            fileRef = ref(storage, `${translationFolder}/${newFileName}`);
            translationFileRef = ref(storage, `${originalFolder}/${selectedFile.name}`);


            fileData.translations[newLanguage] = newFileName;
            fileData.translations[originalLanguage] = selectedFile.name;
            fileData.lang = originalLanguage;

            translationData.translations = fileData.translations;

            translationData.lang = newLanguage;

            // Add the original file name to the translations object in the new translation data
            translationData.translations[originalLanguage] = selectedFile.name;

            // Upload the new translation file
            await uploadString(fileRef, JSON.stringify(translationData));

            // Update related files without fetching them by using existing references
            const relatedTranslations = {...fileData.translations, [newLanguage]: newFileName};

            await Promise.all(
                Object.keys(relatedTranslations).map(async (lang) => {
                    const relatedFileName = relatedTranslations[lang];
                    if (relatedFileName === newFileName) return;
                    const relatedFileRef = ref(storage, `${originalFolder}/${relatedFileName}`);

                    // Fetch existing content to update it
                    try {
                        const downloadUrl = await getDownloadURL(relatedFileRef);
                        const fileContent = await fetch(downloadUrl).then((res) => res.json());
                        fileContent.translations[newLanguage] = newFileName;
                        await uploadString(relatedFileRef, JSON.stringify(fileContent));
                    } catch (e) {
                        console.error(`Failed to update related file ${relatedFileName}: `, e);
                    }
                })
            );
        } else {
            fileRef = ref(storage, `${originalFolder}/${selectedFile.name}`);
        }

        const contentToSave = isTranslating ? translationData : fileData;
        contentToSave.content = contentToSave.content.replaceAll('<p>', "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'");

        // Upload the original file content
        await uploadString(fileRef, JSON.stringify(contentToSave));

        if (!isTranslating) {
            await uploadString(ref(storage, `${originalFolder}/${selectedFile.name}`), JSON.stringify(fileData));
        }

        if (isTranslating) {
            await uploadString(translationFileRef, JSON.stringify(fileData));
        }

        const updatedFiles = files.map((file) =>
            file.name === selectedFile.name ? {...file, fileContent: fileData} : file
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
        });
    };


    const handleTranslate = (file, isAlreadyPub, isEarlyReleased) => {
        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });
        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);

        setSelectedFile(file);
        setTranslationData({
            ...file.fileContent,
        });
        setIsTranslating(true);
        setOriginalLanguage(file.fileContent.lang);
    };

    const handleTranslationChange = (e, field) => {
        const {value} = e.target;
        setTranslationData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <UserNav/>
            <div className="container mt-4">
                <h2 className={"row d-flex text-white"}>
                    <p className={"col-3"}>
                        Translation System
                    </p>

                    <Form className={"col-9 d-flex justify-content-end"}>
                        <Form.Check
                            type="switch"
                            id="sort-by-date-switch"
                            label="Sort by Date"
                            checked={sortByDate}
                            onChange={() => setSortByDate(!sortByDate)}
                        />
                    </Form>
                </h2>
                <hr className="bg-white"/>
                <h3 className={"text-white"}>Uploaded Files <span className={"text-info small"}>green check means ready for publishing</span>
                </h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <ListGroup>
                    {(sortByDate ? files.toSorted((a, b) => {
                        const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
                        const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
                        return dateB - dateA;
                    }) : files).map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            {file.fileContent.isReady && <><i
                                className={"text-success fa-solid fa-check"}></i><span> </span></>}<p
                            key={file.fileContent.date}
                            className="form-label badge bg-dark-subtle text-dark m-1">{file.fileContent.date}</p>{file.fileContent.title}

                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang}
                                                   className={"form-label badge text-dark m-1 " + ((lang===file.fileContent.lang)?"bg-warning-subtle":"bg-dark-subtle")}>{availableLanguages[lang]}</p>
                                        );
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, false, false)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3 className={"text-white"}>Early Releases</h3>
                {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                <ListGroup>
                    {(sortByDate ? earlyReleasedArticles.toSorted((a, b) => {
                        const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
                        const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
                        return dateB - dateA;
                    }) : earlyReleasedArticles).map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            <p key={file.fileContent.date}
                               className="form-label badge bg-dark-subtle text-dark m-1">{file.fileContent.date}</p>{file.fileContent.title}
                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang}
                                                   className={"form-label badge text-dark m-1 " + ((lang===file.fileContent.lang)?"bg-warning-subtle":"bg-dark-subtle")}>{availableLanguages[lang]}</p>
                                        );
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, false, true)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <h3 className={"text-white"}>Already Published</h3>
                {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                <ListGroup>
                    {(sortByDate ? alreadyPublishedArticles.toSorted((a, b) => {
                        const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
                        const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
                        return dateB - dateA;
                    }) : alreadyPublishedArticles).map((file, index) => (
                        <ListGroup.Item key={index} className={"bg-dark text-light"}>
                            <p key={file.fileContent.date}
                               className="form-label badge bg-dark-subtle text-dark m-1">{file.fileContent.date}</p>{file.fileContent.title}
                            {
                                (file.fileContent.translations && Object.keys(file.fileContent.translations).length > 0) ? (
                                    Object.keys(file.fileContent.translations).map((lang) => {
                                        return (<p key={lang}
                                                   className={"form-label badge text-dark m-1 " + ((lang===file.fileContent.lang)?"bg-warning-subtle":"bg-dark-subtle")}>{availableLanguages[lang]}</p>
                                        );
                                    })
                                ) : (
                                    <p>No translations available</p>
                                )
                            }
                            <Button variant="warning" onClick={() => handleTranslate(file, true, false)}>
                                Translate
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Modal
                    width={'300vh'}
                    className={'d-flex justify-content-center'}
                    show={showModal}
                    onHide={() => {
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
                            lang: '',
                        });

                        setFileData({
                            content: '',
                            title: '',
                            details: '',
                            Socials: '',
                            img01: '',
                            sub: '',
                            date: '',
                            translations: {},
                            lang: '',
                        });
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{isTranslating ? 'Translate File' : 'Edit File Data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={'d-flex justify-content-center'}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5>Original</h5>
                                    <Form.Group controlId="originalContent">
                                        <Form.Label>Content</Form.Label>
                                        <ReactQuill key={`original-${selectedFile?.name}`} theme="snow"
                                                    value={fileData.content} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={fileData.title} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalDetails">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control type="text" value={fileData.details} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalImg01">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control type="text" value={fileData.img01} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalSub">
                                        <Form.Label>Author Code</Form.Label>
                                        <Form.Control type="text" value={fileData.sub} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="text" value={fileData.date} readOnly={true}/>
                                    </Form.Group>
                                    <Form.Group controlId="originalLanguage">
                                        <Form.Label>Original Language</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={originalLanguage}
                                            onChange={(e) => setOriginalLanguage(e.target.value)}
                                            disabled={!!fileData.lang}
                                        >
                                            <option value="">Select Language</option>
                                            {/* Placeholder option */}
                                            {Object.keys(availableLanguages).map((langCode) => {
                                                return (
                                                    <option value={langCode}>{availableLanguages[langCode]}</option>)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <h5>Translation</h5>
                                    <Form.Group controlId="translatedContent">
                                        <Form.Label>Content</Form.Label>
                                        <ReactQuill
                                            key={`translation-${selectedFile?.name}`}
                                            theme="snow"
                                            value={translationData.content}
                                            onChange={(value) =>
                                                handleTranslationChange({target: {value}}, 'content')
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.title}
                                            onChange={(e) => handleTranslationChange(e, 'title')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedDetails">
                                        <Form.Label>Details</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.details}
                                            onChange={(e) => handleTranslationChange(e, 'details')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedImg01">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.img01}
                                            onChange={(e) => handleTranslationChange(e, 'img01')}
                                            readOnly={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedSub">
                                        <Form.Label>AuthorCode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.sub}
                                            onChange={(e) => handleTranslationChange(e, 'sub')}
                                            readOnly={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="translatedDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={translationData.date}
                                            onChange={(e) => handleTranslationChange(e, 'date')}
                                        />
                                    </Form.Group>
                                    {isTranslating && (
                                        <>
                                            <Form.Group controlId="translatedLanguage">
                                                <Form.Label>Language</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={newLanguage}
                                                    onChange={(e) => setNewLanguage(e.target.value)}
                                                >
                                                    <option value="">Select Language</option>
                                                    {/* Placeholder option */}
                                                    {Object.keys(availableLanguages).map((langCode) => {
                                                        return (<option
                                                            value={langCode}>{availableLanguages[langCode]}</option>)
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                        </>

                                    )}
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default TranslationSystem;
