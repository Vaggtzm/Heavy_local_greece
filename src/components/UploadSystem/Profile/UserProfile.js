import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { auth, config } from '../../../firebase';
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    signInWithEmailAndPassword,
    updateProfile, updatePassword
} from "firebase/auth";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import UserNav from "../../Users/UserNav"; // Assuming you have a firebase.js file with Firebase setup

const UserProfile = () => {
    const [user, setUser] = useState(auth.currentUser || null);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            // Your async code here
            await fetchAndActivate(config);
            const userList = JSON.parse(getValue(config, "translationSystem").asString());
            // Your logic here
        };

        fetchUserData();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setDisplayName(user?.displayName || '');
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

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: displayName.trim(),
            });
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        // Ensure the passwords match before proceeding
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Re-authenticate the user with their current credentials
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            // Update the user's password
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
                            <Form.Control type="text" value={displayName} onChange={handleDisplayNameChange} style={{ backgroundColor: '#333', color: '#fff' }} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Name
                        </Button>
                    </Form>
                    <Form onSubmit={handleUpdatePassword}>
                        <Form.Group controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={handlePasswordChange} style={{ backgroundColor: '#333', color: '#fff' }} />
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={newPassword} onChange={handleNewPasswordChange} style={{ backgroundColor: '#333', color: '#fff' }} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} style={{ backgroundColor: '#333', color: '#fff' }} />
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
