import {deleteObject, getDownloadURL, ref, uploadString} from 'firebase/storage';
import {child, get, onValue, ref as databaseRef, remove, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, ListGroup, Modal, Row, Toast} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';
import {auth, database, storage} from '../../../firebase';
import {signOut} from "firebase/auth";
import fetchArticlesCategory from "../articleData/articleData";
import CategoryDropdown from "../components/CategoryDropdown/CategoryDropdown";
import EditLinks from "./EditLinks";

const FirebaseFileList = () => {
    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);

    const [isEarlyReleasedArticles, setIsEarlyReleasedArticles] = useState(false);
    const [isAlreadyPublished, setIsAlreadyPublished] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [sortByDate, setSortByDate] = useState(false);
    const [sortByCategory, setSortByCategory] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [translatorName, setTranslatorName] = useState('');
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        lang: '',
        translations: {},
        isReady: false

    });
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');

    const [leader, setIsLeader] = useState(true);

    const [showToast, setShowToast] = useState(false);


    const fetchFiles = async () => {
        try {
            fetchArticlesCategory('upload_from_authors', setEarlyReleasesError, setAlreadyPublishedError, setError, 20).then((publishedFilesData) => {
                setFiles(publishedFilesData);
            });

            fetchArticlesCategory('articles', setEarlyReleasesError, setAlreadyPublishedError, setError, 10).then((publishedFilesData) => {
                setAlreadyPublishedArticles(publishedFilesData);
            });

            fetchArticlesCategory('early_releases', setEarlyReleasesError, setAlreadyPublishedError, setError, 100).then((publishedFilesData) => {
                setEarlyReleasedArticles(publishedFilesData);
            });

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const roles = databaseRef(database, "/roles");

        onValue(roles, (snapshot) => {
            const roles = snapshot.val();

            const userList = roles.admin;
            let leaderList = roles.authorLeader;
            auth.onAuthStateChanged((user) => {
                if (user && (userList.includes(user.email) || leaderList.includes(user.email))) {
                    setIsLeader(leaderList.includes(user.email));
                } else {
                    navigate('/upload');
                    signOut(auth).then();
                }
            });
            fetchFiles();
        });
    }, [navigate]);


    const handleEdit = (file, isAlreadyPub, isEarlyReleased) => {

        file.data = {
            isEarlyAccess: isEarlyReleased,
            isPublished: isAlreadyPub
        }

        setSelectedFile(file);
        setFileData({
            ...file.fileContent,
        });

        const authorRef = databaseRef(database, `authors/${fileData.sub}`);
        try {
            get(authorRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    setAuthorName(snapshot.val().displayName);
                } else {
                    setAuthorName("");
                }
            });
        } catch (e) {
            console.log(e)
            setAuthorName("");

        }

        const translatorRef = databaseRef(database, `authors/${fileData.translatedBy}`);
        try {
            get(translatorRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    console.log(snapshot.val());
                    setTranslatorName(snapshot.val().displayName||'');
                } else {
                    setTranslatorName("");
                    console.log()
                }
            });
        } catch (e) {
            console.log(e)
            setTranslatorName("");
        }

        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!selectedFile || !fileData) return;
        try {
            let fileRef;
            if (isAlreadyPublished) {
                fileRef = ref(storage, `articles/${selectedFile.name}`);
            } else if (isEarlyReleasedArticles) {
                fileRef = ref(storage, `early_releases/${selectedFile.name}`);
            } else {
                fileRef = ref(storage, `upload_from_authors/${selectedFile.name}`);
            }
            fileData.content = fileData.content.replaceAll('<p>', "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'");
            await uploadString(fileRef, JSON.stringify(fileData));
            const updatedFiles = files.map((file) =>
                file.name === selectedFile.name ? {...file, fileContent: fileData} : file
            );
            setFiles(updatedFiles);

            setShowModal(false);
            setAuthorName("");
            fetchFiles();
        } catch (error) {
            setError('Error saving file data: ' + error.message);
        }
    };

    const handleChange = async (e, field, isObject) => {
        console.log(selectedFile);


        let {value} = e.target;
        if (field === "category"||field==="sub"||field==="translatedBy") {
            if(field === "category"){
                fileData.category = value;
            }
            const oldCategory = fileData.category;
            const articleRef = databaseRef(database, `articles/${fileData.category}/${selectedFile.name.replace('.json', '')}`);
            const data = selectedFile.data
            update(articleRef, data).then();

            let folder

            if (data.isEarlyAccess) {
                folder = "early_releases"
            } else if (data.isPublished) {
                folder = "articles"
            } else {
                folder = "upload_from_authors";
            }

            const author = (selectedFile.fileContent.translatedBy)?selectedFile.fileContent.translatedBy:selectedFile.fileContent.sub;

            const authorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(authorRef).then();

            const newAuthorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${fileData.category}/`);
            update(newAuthorRef, {[selectedFile.name.replace('.json', '')]: true});
            console.log(`Updated: authors/${author}/writtenArticles/${folder}/${fileData.category}/`)
            const oldArticleRef = databaseRef(database, `articles/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(oldArticleRef).then();
        }
        if (isObject) {
            value = JSON.parse(value);
        }
        setFileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContentChange = (value) => {
        const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
        setFileData((prevData) => ({
            ...prevData,
            content: sanitizedValue,
        }));
    };

    const handleDelete = async (file, isAlreadyPub, isEarlyReleased) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the file "${file.name}"?`);
        if (!isConfirmed) return;
        try {
            let fileRef;
            if (isAlreadyPub) {
                fileRef = ref(storage, `articles/${file.name}`);
            } else if (isEarlyReleased) {
                fileRef = ref(storage, `early_releases/${file.name}`);
            } else {
                fileRef = ref(storage, `upload_from_authors/${file.name}`);
            }

            await deleteObject(fileRef);
            fetchFiles();
        } catch (error) {
            setError('Error deleting file: ' + error.message);
        }
    };

    const handlePublish = async (to_normal_release, filename, isEarlyReleasedArticles) => {

        try {
            let originalfolder = "upload_from_authors";
            let folder = "early_releases";


            if (to_normal_release) {
                folder = "articles";
            }
            if (isEarlyReleasedArticles) {
                folder = "articles";
                originalfolder = "early_releases";
            }

            const destinationFileRef = ref(storage, `${folder}/${filename}`);
            let originalFileRef = ref(storage, `${originalfolder}/${filename}`);

            const downloadUrl = await getDownloadURL(originalFileRef);
            const fileContent = JSON.parse(await fetch(downloadUrl).then(res => res.text()));
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            if(!fileContent.translatedBy) {
                fileContent.written_date = fileContent.date;
                fileContent.date = new Date().toLocaleDateString('en-GB', options);
            }

            await uploadString(destinationFileRef, JSON.stringify(fileContent));
            alert('File published successfully to the destination folder!');
            await deleteObject(originalFileRef);

            if (isEarlyReleasedArticles) {
                const articleRef = databaseRef(database, `articles/${fileContent.category}/${filename.replace('.json', '')}`);
                update(articleRef, {isEarlyAccess: false}).then();


                let newRef;
                let oldRef;
                if(fileContent.translatedBy===undefined) {
                    newRef = databaseRef(database,`/authors/${fileContent.sub}/writtenArticles/${folder}/${fileContent.category}`);
                    oldRef = databaseRef(database,`/authors/${fileContent.sub}/writtenArticles/${originalfolder}/${fileContent.category}`);
                }else {
                    newRef = databaseRef(database,`/authors/${fileContent.translatedBy}/writtenArticles/${folder}/${fileContent.category}`);
                    oldRef = databaseRef(database,`/authors/${fileContent.translatedBy}/writtenArticles/${originalfolder}/${fileContent.category}`);
                }

                update(newRef, {[filename.replace(".json", "")]: true}).then();
                remove(oldRef).then();


                const usersRef = databaseRef(database, 'users');
                const snapshot = await get(child(usersRef, '/'));
                if (snapshot.exists()) {
                    snapshot.forEach((user) => {
                        user.val();
                        const savedArticlesRef = databaseRef(database, `users/${user.key}/savedArticles/${filename.replace(".json", "")}`);
                        onValue(savedArticlesRef, (snapshot) => {
                            const savedArticles = snapshot.val();
                            console.log(savedArticles)
                            if (savedArticles) {
                                update(savedArticlesRef, {isEarlyAccess: false, isPublished: true});
                            }
                        });
                    });
                    console.log("Updated")
                }
            } else {
                const articleRef = databaseRef(database, `articles/${fileContent.category}/${filename.replace('.json', '')}`);
                update(articleRef, {isEarlyAccess: to_normal_release, isPublished: true}).then();
            }


            fetchFiles();

        } catch (error) {
            setError('Error publishing file: ' + error.message);
        }
    };

    const copyLinkToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            setShowToast(true);
        });
    };

    const handleShowList = (files, isAlreadyPublished, isEarlyReleased) => {
        console.log((leader) ? "User is Leader" : "User is not leader");

        let sortedList = [...files];

        if (sortByCategory) {
            sortedList.sort((a, b) => {
                if(!a.fileContent.category || !b.fileContent.category){
                    return 0;
                }else {
                    return a.fileContent.category.localeCompare(b.fileContent.category)
                }
            });
            const groupedByCategory = sortedList.reduce((acc, article) => {
                const category = article.fileContent.category || 'Uncategorized';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(article);
                return acc;
            }, {});

            return (
                <>
                    {Object.entries(groupedByCategory).map(([category, articles]) => (
                        <div key={category}>
                            <h5 className={"text-white"}>{category}</h5>
                            <ListGroup>
                                {(sortByDate ? articles.sort((a, b) => {
                                    try {
                                        const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
                                        const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
                                        return dateB - dateA;
                                    } catch (e) {
                                        console.log(b);
                                        return -1;
                                    }
                                }) : articles).map((file, index) => (
                                    <ListGroup.Item key={index} className={"bg-dark text-white"}>
                                        {file.fileContent.isReady && <><i className={"text-success fa-solid fa-check"}></i><span> </span></>}
                                        <p key={file.fileContent.date} className="form-label badge bg-dark-subtle text-dark m-1">
                                            {file.fileContent.date}
                                        </p>

                                        {(isEarlyReleased || isAlreadyPublished) ? (
                                            <a
                                                className="link-light link-underline-opacity-0 link-underline-opacity-100-hover"
                                                style={{ cursor: "pointer" }}
                                                href={'/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', '')}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    copyLinkToClipboard('/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', ''));
                                                    return false;
                                                }}
                                            >
                                                {file.fileContent.title}
                                            </a>
                                        ) : (
                                            <>{file.fileContent.title}</>
                                        )}

                                        {((leader && !isAlreadyPublished && !isEarlyReleased) || !leader) && (
                                            <Button
                                                variant="info"
                                                className="ms-2"
                                                onClick={() => handleEdit(file, isAlreadyPublished, isEarlyReleased)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        {(!leader) && (
                                            <Button
                                                variant="danger"
                                                className="ms-2"
                                                onClick={() => handleDelete(file, isAlreadyPublished, isEarlyReleased)}
                                            >
                                                Delete
                                            </Button>
                                        )}

                                        {(!isAlreadyPublished && isEarlyReleased && !leader) && (
                                            <Button variant="success" onClick={() => {
                                                handlePublish(false, file.name, isEarlyReleased);
                                            }} className="ms-2">
                                                Publish Normally
                                            </Button>
                                        )}


                                        {(!isAlreadyPublished && !isEarlyReleased && !leader) && (
                                            <>
                                                <Button variant="success"  onClick={() => {
                                                    handlePublish(false, file.name, isEarlyReleased);
                                                }}
                                                        className={"ms-2 justify-content-center"}>
                                                    Publish Early
                                                </Button>

                                                <Button variant="warning" onClick={() => {
                                                    handlePublish(true, file.name, isEarlyReleased);
                                                }}
                                                        className={"ms-2 justify-content-center"}>
                                                    Publish Normally
                                                </Button>
                                            </>
                                        )}

                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    ))}
                </>
            );
        }


        if (sortByDate) {
            sortedList = sortedList.sort((a, b) => {
                try {
                    const dateA = new Date(a.fileContent.date.split('/').reverse().join('-'));
                    const dateB = new Date(b.fileContent.date.split('/').reverse().join('-'));
                    return dateB - dateA;
                } catch (e) {
                    console.log(b);
                    return -1;
                }
            });
        }

        return (
            <ListGroup>
                {sortedList.map((file, index) => (
                    <ListGroup.Item key={index} className={"bg-dark text-white"}>
                        {file.fileContent.isReady && <><i className={"text-success fa-solid fa-check"}></i><span> </span></>}
                        <p key={file.fileContent.date} className="form-label badge bg-dark-subtle text-dark m-1">
                            {file.fileContent.date}
                        </p>

                        {(isEarlyReleased || isAlreadyPublished) ? (
                            <a
                                className="link-light link-underline-opacity-0 link-underline-opacity-100-hover"
                                style={{ cursor: "pointer" }}
                                href={'/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', '')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    copyLinkToClipboard('/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', ''));
                                    return false;
                                }}
                            >
                                {file.fileContent.title} - {file.name}
                            </a>
                        ) : (
                            <>{file.fileContent.title}</>
                        )}

                        {((leader && !isAlreadyPublished && !isEarlyReleased) || !leader) && (
                            <Button
                                variant="info"
                                className="ms-2"
                                onClick={() => handleEdit(file, isAlreadyPublished, isEarlyReleased)}
                            >
                                Edit
                            </Button>
                        )}
                        {(!leader) && (
                            <Button
                                variant="danger"
                                className="ms-2"
                                onClick={() => handleDelete(file, isAlreadyPublished, isEarlyReleased)}
                            >
                                Delete
                            </Button>
                        )}

                        {(!isAlreadyPublished && isEarlyReleased && !leader) && (
                                <Button variant="success" onClick={() => {
                                    handlePublish(false, file.name, isEarlyReleased);
                                }} className="ms-2">
                                    Publish Normally
                                </Button>
                        )}


                        {(!isAlreadyPublished && !isEarlyReleased && !leader) && (
                            <>
                                <Button variant="success" onClick={() => {
                                    handlePublish(false, file.name, isEarlyReleased);
                                }}
                                        className={"ms-2 justify-content-center"}>
                                    Publish Early
                                </Button>

                                <Button variant="warning" onClick={() => {
                                    handlePublish(true, file.name, isEarlyReleased);
                                }}
                                        className={"ms-2 justify-content-center"}>
                                    Publish Normally
                                </Button>
                            </>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    };


    return (
        <>
            <div className="container mt-4">
                <h2 className={"row d-flex text-white"}>
                    <p className={"col-4"}>
                        Admin Publish System
                    </p>

                    <Form className={"col-8 d-flex justify-content-end"}>
                        <Form.Check
                            type="switch"
                            id="sort-by-date-switch"
                            label="Sort by Date"
                            checked={sortByDate}
                            onChange={() => setSortByDate(!sortByDate)}
                        />
                        <Form.Check
                            type="switch"
                            id="sort-by-category-switch"
                            label="Sort by Category"
                            checked={sortByCategory}
                            onChange={() => setSortByCategory(!sortByCategory)}
                        />
                    </Form>
                </h2>
                <hr className="bg-dark"/>
                <h3 className={"text-light"}>
                    Uploaded Files <span className={"text-info small"}>green check means ready for publishing</span>
                </h3>
                {error && <Alert variant="danger">{error}</Alert>}

                {handleShowList(files, false, false)}

                <h3 className={"text-light"}>Early Releases <small className={"small text-info"}>Click on an article to
                    copy the link</small></h3>
                {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                {handleShowList(earlyReleasedArticles, false, true)}
                <h3 className={"text-light"}>Already Published <small className={"small text-info"}>Click on an article
                    to copy the link</small></h3>
                {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                {handleShowList(alreadyPublishedArticles, true, false)}

                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 30000,
                    }}
                >
                    <Toast.Header>
                        <strong className="me-auto">Link Copied!</strong>
                    </Toast.Header>
                    <Toast.Body>The article link has been copied to the clipboard.</Toast.Body>
                </Toast>

                <Modal show={showModal} onHide={() => setShowModal(false)} onExited={() => {
                    setFileData({})
                    setAuthorName("");
                    setTranslatorName("");
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit File Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="content">
                                <Form.Label>Content</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    key={selectedFile ? selectedFile.name : ''}
                                    value={fileData.content}
                                    onChange={handleContentChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.title}
                                    onChange={(e) => handleChange(e, 'title', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="details">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.details}
                                    onChange={(e) => handleChange(e, 'details', false)}
                                />
                            </Form.Group>
                            <EditLinks initialHtmlString={fileData.Socials} setOutput={(value)=>{
                                console.log(value);
                                handleChange({target: {value: value}}, 'Socials', false)
                            }}/>
                            <Form.Group controlId="img01">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.img01}
                                    onChange={(e) => handleChange(e, 'img01', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="translator">
                                <Form.Label>Translator{translatorName && <>({translatorName})</>}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.translatedBy}
                                    onChange={(e) => {
                                        const authorRef = databaseRef(database, `authors/${e.target.value}`);
                                        try {
                                            get(authorRef).then((snapshot) => {
                                                if (snapshot.exists()) {
                                                    console.log(snapshot.val())
                                                    setTranslatorName(snapshot.val().displayName);
                                                } else {
                                                    setTranslatorName("");
                                                }
                                            });
                                        } catch (e) {
                                            console.log(e)
                                            setAuthorName("");
                                        }
                                        handleChange(e, 'translatedBy', false).then(r => {})
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="sub">
                                <Form.Label>Author code{authorName && <>({authorName})</>}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.sub}
                                    onChange={(e) => {
                                        const authorRef = databaseRef(database, `authors/${e.target.value}`);
                                        try {
                                            get(authorRef).then((snapshot) => {
                                                if (snapshot.exists()) {
                                                    console.log(snapshot.val())
                                                    setAuthorName(snapshot.val().displayName);
                                                } else {
                                                    setAuthorName("");
                                                }
                                            });
                                        } catch (e) {
                                            console.log(e)
                                            setAuthorName("");
                                        }
                                        handleChange(e, 'sub', false)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.date}
                                    onChange={(e) => handleChange(e, 'date', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lang">
                                <Form.Label>Language</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={fileData.lang}
                                    onChange={(e) => handleChange(e, 'lang', false)}
                                />
                            </Form.Group>
                            <Form.Group controlId="translations">
                                <Form.Label>Translations</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={JSON.stringify(fileData.translations)}
                                    onChange={(e) => handleChange(e, 'translations', true)}
                                />
                            </Form.Group>

                            <Form.Group controlId="translations">
                                <Form.Label>Category</Form.Label>

                                <CategoryDropdown
                                    categories={[
                                        "Top News",
                                        "General News",
                                        "Interviews",
                                        "Collabs and Sponsorships",
                                        "Latest Reviews(ENG)",
                                        "Latest Reviews(GRE)",
                                        "Legends"
                                    ]}
                                    onSelectCategory={(category)=>{
                                        handleChange({target: {value: category}}, 'category', false)
                                    }}
                                    required ={true}
                                    value={fileData.category}
                                />
                            </Form.Group>

                            <Form.Group controlId="isReady" className={"d-flex justify-content-center"}>

                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className={"d-flex justify-content-center"}>
                            <Col className={"col-12 d-flex justify-content-center"}>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="The article is ready to be published"
                                    checked={fileData.isReady}
                                    className={"bg-warning-subtle rounded-3 justify-content-center"}
                                    onChange={() => {
                                        console.log(fileData.isReady)
                                        if (!fileData.isReady) {
                                            handleChange({target: {value: true}}, 'isReady', false)
                                        } else {
                                            handleChange({target: {value: false}}, 'isReady', false)
                                        }

                                    }}
                                    style={{
                                        fontSize: '1.25rem',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col className={"col-2 d-flex justify-content-center"}>
                                <Button variant="secondary" className={"m-3"} onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                            </Col>
                            <Col className={"col-6 d-flex justify-content-center"}>
                                <Button variant="primary" className={"m-3"} onClick={handleSave}>
                                    Save Changes
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
export default FirebaseFileList;
