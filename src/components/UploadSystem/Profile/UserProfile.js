import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { auth, config, storage } from '../../../firebase';
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    signInWithEmailAndPassword,
    updateProfile, updatePassword
} from "firebase/auth";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserNav from "../../Users/UserNav";
import { getFunctions, httpsCallable } from "firebase/functions";

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

    useEffect(() => {
        const fetchUserData = async () => {
            await fetchAndActivate(config);
            const userList = JSON.parse(getValue(config, "translationSystem").asString());
            // Your logic here
        };

        fetchUserData();

        const unsubscribe = auth.onAuthStateChanged((user) => {
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

            // Initialize Firebase Functions
            const functions = getFunctions();
            const updateUserInAuthors = httpsCallable(functions, 'updateUserInAuthors');

            // Call the updateUserInAuthors function
            await updateUserInAuthors({
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
            <UserNav />
            <div className="container mt-4">
                <div style={{ color: '#fff' }}>
                    <h2>User Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form onSubmit={handleUpdateProfile}>
                        <Form.Group controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={displayName}
                                onChange={handleDisplayNameChange}
                                style={{ backgroundColor: '#333', color: '#fff' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="profileImage">
                            <Form.Label>Profile Image</Form.Label>
                            {profileImageUrl && (
                                <div className="mt-2">
                                    <img
                                        src={profileImageUrl}
                                        alt="Profile"
                                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                    />
                                </div>
                            )}
                            <Form.Control
                                type="file"
                                onChange={handleProfileImageChange}
                                style={{ backgroundColor: '#333', color: '#fff' }}
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
                                style={{ backgroundColor: '#333', color: '#fff' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                style={{ backgroundColor: '#333', color: '#fff' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                style={{ backgroundColor: '#333', color: '#fff' }}
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
