import React, {useState, useEffect} from 'react';
import {Button, Form, Alert} from 'react-bootstrap';
import {auth, database, storage} from '../../../firebase';
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile, updatePassword, getIdTokenResult
} from "firebase/auth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, get, update} from "firebase/database";

const UserProfile = () => {
    const [user, setUser] = useState(auth.currentUser || null);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(user?.photoURL || '');
    const [userRef, setUserRef] = useState(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const idTokenResult =  await getIdTokenResult(user);
            let userFolder;
            if (idTokenResult.claims && idTokenResult.claims.admin) {
                console.log("the user is an admin");
                userFolder = 'authors';
            } else {
                userFolder = 'users';
            }

            const userRef = databaseRef(database, `${userFolder}/${user.uid}`);
            setUserRef(userRef);
            const userstore = await get(userRef);

            if (userstore.exists()) {
                const userData = userstore.val();
                if (!userData.wantToShow) {
                    userData.wantToShow = false;
                } else {
                    user.wantToShow = userData.wantToShow;
                }
            }

            setUser(user);
            setDisplayName(user?.displayName || '');
            setProfileImageUrl(user?.photoURL || '');

        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>Loading...</div>; // or any other fallback UI
    }

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            if (profileImage) {
                const imageRef = ref(storage, `profile_images/${user.uid}`);
                await uploadBytes(imageRef, profileImage);
                const imageUrl = await getDownloadURL(imageRef);
                await updateProfile(user, {
                    displayName: displayName.trim(),
                    photoURL: imageUrl,
                });
                setProfileImageUrl(imageUrl);
            } else {
                await updateProfile(user, {
                    displayName: displayName.trim(),
                });
            }


            await update(userRef, {
                email: user.email,
                displayName: displayName.trim(),
                photoURL: user.photoURL || ''
            });

            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            setSuccessMessage('Password updated successfully!');
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <div style={{color: '#fff'}}>

                    <h2 className={"row d-flex text-white"}>
                        <p className={"col-4 h1"}>
                            User Profile
                        </p>

                        <Form className={"col d-flex justify-content-end"}>
                            <Form.Check
                                type="switch"
                                id="sort-by-date-switch"
                                label="Show profile picture on articles"
                                checked={user.wantToShow}
                                onChange={() => {
                                    user.wantToShow = !user.wantToShow;
                                    update(userRef, {
                                        wantToShow: user.wantToShow
                                    });
                                }}
                            />
                        </Form>
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form onSubmit={handleUpdateProfile}>
                        <Form.Group controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={displayName}
                                onChange={handleDisplayNameChange}
                                style={{backgroundColor: '#333', color: '#fff'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="profileImage">
                            <Form.Label>Profile Image</Form.Label>
                            {profileImageUrl && (
                                <div className="mt-2">
                                    <img
                                        src={profileImageUrl}
                                        alt="Profile"
                                        style={{width: '100px', height: '100px', borderRadius: '50%'}}
                                    />
                                </div>
                            )}
                            <Form.Control
                                type="file"
                                onChange={handleProfileImageChange}
                                style={{backgroundColor: '#333', color: '#fff'}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                    <Form onSubmit={handleUpdatePassword}>
                        <Form.Group controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                style={{backgroundColor: '#333', color: '#fff'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                style={{backgroundColor: '#333', color: '#fff'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                style={{backgroundColor: '#333', color: '#fff'}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Password
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
