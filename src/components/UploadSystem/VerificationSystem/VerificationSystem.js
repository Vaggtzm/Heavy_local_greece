import {deleteObject, getDownloadURL, ref as storageRef, uploadString} from 'firebase/storage';
import {child, get, ref as databaseRef, remove, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, ListGroup, Modal, Row, Toast} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom';
import {auth, database, storage} from '../../../firebase';
import {signOut} from "firebase/auth";
import CategoryDropdown from "../components/CategoryDropdown/CategoryDropdown";
import {fetchFiles} from "../articleData/articleData";

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
    const [socials, setSocials] = useState({});
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
        isReady: false,
    });
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
    const [leader, setIsLeader] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const rolesRef = databaseRef(database, '/roles');

        get(rolesRef).then((snapshot) => {
            const roles = snapshot.val();
            const userList = roles.admin || [];
            const leaderList = roles.authorLeader || [];

            auth.onAuthStateChanged((user) => {
                if (user && (userList.includes(user.email) || leaderList.includes(user.email))) {
                    setIsLeader(leaderList.includes(user.email));
                } else {
                    navigate('/upload');
                    signOut(auth).then();
                }
            });
        });

        fetchFiles(setFiles, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading).then();
    }, [navigate]);

    const copyLinkToClipboard = (link) => {

    }

    const handleEdit = (file, isAlreadyPub, isEarlyReleased) => {
        file.data = {
            isEarlyAccess: isEarlyReleased,
            isPublished: isAlreadyPub,
        };

        setSelectedFile(file);
        setFileData(file.fileContent);
        setSocials(file.fileContent.socials || {});

        fetchAuthorAndTranslatorNames(file.fileContent.sub, file.fileContent.translatedBy).then();
        setIsAlreadyPublished(isAlreadyPub);
        setIsEarlyReleasedArticles(isEarlyReleased);
        setShowModal(true);
    };

    const fetchAuthorAndTranslatorNames = async (authorId, translatorId) => {
        const authorRef = databaseRef(database, `authors/${authorId}`);
        const translatorRef = databaseRef(database, `authors/${translatorId}`);

        try {
            const [authorSnapshot, translatorSnapshot] = await Promise.all([
                get(authorRef),
                get(translatorRef),
            ]);

            setAuthorName(authorSnapshot.exists() ? authorSnapshot.val().displayName || '' : '');
            setTranslatorName(translatorSnapshot.exists() ? translatorSnapshot.val().displayName || '' : '');
        } catch (error) {
            console.error('Error fetching author and translator names:', error);
            setAuthorName('');
            setTranslatorName('');
        }
    };

    const handleSave = async () => {
        if (!selectedFile || !fileData) return;

        try {
            const filePath = isAlreadyPublished ? 'articles' : (isEarlyReleasedArticles ? 'early_releases' : 'upload_from_authors');
            const fileRef = storageRef(storage, `${filePath}/${selectedFile.name}`);

            const updatedContent = fileData.content.replaceAll('<p>', "<p class='lead'>").replaceAll('<img', "<img class='img-fluid'");
            await uploadString(fileRef, JSON.stringify({ ...fileData, content: updatedContent }));

            const functionforUpdate = isAlreadyPublished ? setAlreadyPublishedArticles : (isEarlyReleasedArticles ? setEarlyReleasedArticles : setFiles);
            functionforUpdate((files)=>{
                return files.map((file) => (file.name === selectedFile.name ? { ...file, fileContent: fileData } : file));
            });

            setAuthorName('');
            setSocials({});
            setShowModal(false);

            alert('Changes saved successfully!');
        } catch (error) {
            setError('Error saving file data: ' + error.message);
        }
    };

    const handleChange = (e, field, isObject) => {
        let { value } = e.target;

        if (field === 'category' || field === 'sub' || field === 'translatedBy') {
            if (field === 'category') {
                fileData.category = value;
            }

            const oldCategory = fileData.category;
            const articleRef = databaseRef(database, `articles/${fileData.category}/${selectedFile.name.replace('.json', '')}`);
            const data = selectedFile.data;

            update(articleRef, data);

            let folder;

            if (data.isEarlyAccess) {
                folder = 'early_releases';
            } else if (data.isPublished) {
                folder = 'articles';
            } else {
                folder = 'upload_from_authors';
            }

            const author = selectedFile.fileContent.translatedBy || selectedFile.fileContent.sub;
            const authorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(authorRef);

            const newAuthorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${fileData.category}/`);
            update(newAuthorRef, { [selectedFile.name.replace('.json', '')]: true });

            const oldArticleRef = databaseRef(database, `articles/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(oldArticleRef);
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

    const handleSocialChange = (field, value) => {
        let { value: fieldValue } = value.target;
        setSocials((prevData) => ({
            ...prevData,
            [field]: fieldValue,
        }));

        const updatedSocials = {
            ...socials,
            [field]: fieldValue,
        };

        handleChange({ target: { value: JSON.stringify(updatedSocials) || '{}' } }, 'socials', true);
    };

    const handleDelete = async (file, isAlreadyPub, isEarlyReleased) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the file "${file.name}"?`);
        if (!isConfirmed) return;

        try {
            let filePath;
            let updatedList;
            if(isAlreadyPub){
                filePath='articles'
                updatedList=setAlreadyPublishedArticles;
            } else if (isEarlyReleased){
                filePath='early_releases'
                updatedList=setEarlyReleasedArticles;
            }else{
                filePath='upload_from_authors'
                updatedList=setFiles;
            }
            const fileRef = storageRef(storage, `${filePath}/${file.name}`);

            await deleteObject(fileRef);


            updatedList((prevList) => prevList.filter(item => item.name !== file.name));
        } catch (error) {
            setError('Error deleting file: ' + error.message);
        }
    };

    const handlePublish = async (to_normal_release, file, isEarlyReleasedArticles) => {
        try {
            let originalfolder = "upload_from_authors";
            let folder = "early_releases";

            // Manage list updates based on conditions
            let newList, oldList;
            oldList = setFiles;
            newList = setEarlyReleasedArticles;


            if (to_normal_release) {
                folder = "articles";
                newList = setAlreadyPublishedArticles;
            }
            if (isEarlyReleasedArticles) {
                folder = "articles";
                originalfolder = "early_releases";
                oldList = setEarlyReleasedArticles;
                newList = setAlreadyPublishedArticles;
            }

            const destinationFileRef = storageRef(storage, `${folder}/${file.name}`);
            const originalFileRef = storageRef(storage, `${originalfolder}/${file.name}`);

            // Retrieve fileContent directly if it's already available
            let fileContent = null;

            // Fetch fileContent if not already available
            const downloadUrl = await getDownloadURL(originalFileRef);
            const fileText = await fetch(downloadUrl).then(res => res.text());
            fileContent = JSON.parse(fileText);

            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            if (!fileContent.translatedBy) {
                fileContent.written_date = fileContent.date;
                fileContent.date = new Date().toLocaleDateString('en-GB', options);
            }

            // Upload updated fileContent to destination
            await uploadString(destinationFileRef, JSON.stringify(fileContent));
            alert('File published successfully to the destination folder!');

            // Delete original file after successful upload
            await deleteObject(originalFileRef);

            // Update Firestore documents based on conditions
            if (isEarlyReleasedArticles) {
                const articleRef = databaseRef(database, `articles/${fileContent.category}/${file.name.replace('.json', '')}`);
                await update(articleRef, { isEarlyAccess: false });

                let newRef, oldRef;
                if (fileContent.translatedBy === undefined) {
                    newRef = databaseRef(database, `/authors/${fileContent.sub}/writtenArticles/${folder}/${fileContent.category}`);
                    oldRef = databaseRef(database, `/authors/${fileContent.sub}/writtenArticles/${originalfolder}/${fileContent.category}`);
                } else {
                    newRef = databaseRef(database, `/authors/${fileContent.translatedBy}/writtenArticles/${folder}/${fileContent.category}`);
                    oldRef = databaseRef(database, `/authors/${fileContent.translatedBy}/writtenArticles/${originalfolder}/${fileContent.category}`);
                }

                await update(newRef, { [file.name.replace(".json", "")]: true });
                await remove(oldRef);

                // Update users' savedArticles if necessary
                const usersRef = databaseRef(database, 'users');
                const snapshot = await get(child(usersRef, '/'));
                if (snapshot.exists()) {
                    snapshot.forEach((user) => {
                        const savedArticlesRef = databaseRef(database, `users/${user.key}/savedArticles/${file.name.replace(".json", "")}`);
                        get(savedArticlesRef).then((snapshot) => {
                            const savedArticles = snapshot.val();
                            if (savedArticles) {
                                update(savedArticlesRef, { isEarlyAccess: false, isPublished: true });
                            }
                        });
                    });
                }
            } else {
                const articleRef = databaseRef(database, `articles/${fileContent.category}/${file.name.replace('.json', '')}`);
                await update(articleRef, { isEarlyAccess: to_normal_release, isPublished: true });
            }



            // Remove from old list and add to new list
            oldList((prevList) => prevList.filter(item => item.name !== file.name));
            file.fileContent = fileContent
            newList((prevList) => [...prevList, file]);

        } catch (error) {
            setError('Error publishing file: ' + error.message);
        }
    };


    const handleShowList = (files, isAlreadyPublished, isEarlyReleased) => {
        console.log((leader) ? "User is Leader" : "User is not leader");

        let sortedList = [...files];

        if (sortByCategory) {
            sortedList.sort((a, b) => {
                if (!a.fileContent.category || !b.fileContent.category) {
                    return 0;
                } else {
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
                                        {file.fileContent.isReady && <><i
                                            className={"text-success fa-solid fa-check"}></i><span> </span></>}
                                        <p key={file.fileContent.date}
                                           className="form-label badge bg-dark-subtle text-dark m-1">
                                            {file.fileContent.date}
                                        </p>

                                        {(isEarlyReleased || isAlreadyPublished) ? (
                                            <a
                                                className="link-light link-underline-opacity-0 link-underline-opacity-100-hover"
                                                style={{cursor: "pointer"}}
                                                href={'/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', '')}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    copyLinkToClipboard('/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', ''));
                                                    return false;
                                                }}
                                            >
                                                {file.fileContent.title} <br/> {file.name}
                                            </a>
                                        ) : (
                                            <>{file.fileContent.title} <br/> {file.name}</>
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
                                                handlePublish(false, file, isEarlyReleased);
                                            }} className="ms-2">
                                                Publish Normally
                                            </Button>
                                        )}


                                        {(!isAlreadyPublished && !isEarlyReleased && !leader) && (
                                            <>
                                                <Button variant="success" onClick={() => {
                                                    handlePublish(false, file, isEarlyReleased);
                                                }}
                                                        className={"ms-2 justify-content-center"}>
                                                    Publish Early
                                                </Button>

                                                <Button variant="warning" onClick={() => {
                                                    handlePublish(true, file, isEarlyReleased);
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
                        {file.fileContent.isReady && <><i
                            className={"text-success fa-solid fa-check"}></i><span> </span></>}
                        <p key={file.fileContent.date} className="form-label badge bg-dark-subtle text-dark m-1">
                            {file.fileContent.date}
                        </p>

                        {(isEarlyReleased || isAlreadyPublished) ? (
                            <a
                                className="link-light link-underline-opacity-0 link-underline-opacity-100-hover"
                                style={{cursor: "pointer"}}
                                href={'/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', '')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    copyLinkToClipboard('/article/' + ((isEarlyReleased) ? "early/" : "") + file.name.replace('.json', ''));
                                    return false;
                                }}
                            >
                                {file.fileContent.title}
                                <sbr/>
                                {file.name}
                            </a>
                        ) : (
                            <>{file.fileContent.title} <br/> {file.name}</>
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
                                handlePublish(false, file, isEarlyReleased);
                            }} className="ms-2">
                                Publish Normally
                            </Button>
                        )}


                        {(!isAlreadyPublished && !isEarlyReleased && !leader) && (
                            <>
                                <Button variant="success" onClick={() => {
                                    handlePublish(false, file, isEarlyReleased);
                                }}
                                        className={"ms-2 justify-content-center"}>
                                    Publish Early
                                </Button>

                                <Button variant="warning" onClick={() => {
                                    handlePublish(true, file, isEarlyReleased);
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
                <div className="row d-flex align-items-center">
                    <div className="col-4">
                        <h2 className="text-white">Admin Publish System</h2>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <Form className="d-flex align-items-center">
                            <Form.Check
                                type="switch"
                                id="sort-by-date-switch"
                                label="Sort by Date"
                                checked={sortByDate}
                                onChange={() => setSortByDate(!sortByDate)}
                                className="me-3"
                            />
                            <Form.Check
                                type="switch"
                                id="sort-by-category-switch"
                                label="Sort by Category"
                                checked={sortByCategory}
                                onChange={() => setSortByCategory(!sortByCategory)}
                            />
                        </Form>
                    </div>
                </div>
                <hr className="bg-dark"/>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Uploaded Files <span className="text-info small">green check means ready for publishing</span>
                    </h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {handleShowList(files, false, false)}
                </div>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Early Releases <small className="text-info">Click on an article to
                        copy the link</small></h3>
                    {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                    {handleShowList(earlyReleasedArticles, false, true)}
                </div>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Already Published <small className="text-info">Click on an article
                        to copy the link</small></h3>
                    {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                    {handleShowList(alreadyPublishedArticles, true, false)}
                </div>
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
            </div>


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


                        <Form.Group controlId="socials">
                            <Form.Label className={"text-light"}>
                                Social Media Links <span className={"small"}>(enter only those available)</span>
                            </Form.Label>
                            <Row>
                                <Col>
                                    <Form.Label>Facebook:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Facebook"
                                        value={socials.facebook}
                                        onChange={(e) => handleSocialChange('facebook', e)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Instagram:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Instagram"
                                        value={socials.instagram}
                                        onChange={(e) => handleSocialChange('instagram', e)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label>Spotify:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Spotify"
                                        value={socials.spotify}
                                        onChange={(e) => handleSocialChange('spotify', e)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>YouTube:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="YouTube"
                                        value={socials.youtube}
                                        onChange={(e) => handleSocialChange('youtube', e)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label>Old Socials(Do not change, use the new):</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="OldSocials"
                                        value={fileData.Socials}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>


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
                                    handleChange(e, 'translatedBy', false).then();
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
                                onSelectCategory={(category) => {
                                    handleChange({target: {value: category}}, 'category', false)
                                }}
                                required={true}
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
        </>
    );
};
export default FirebaseFileList;
