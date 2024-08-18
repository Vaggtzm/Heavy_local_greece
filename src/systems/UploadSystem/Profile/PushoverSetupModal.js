import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PushoverSetupModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                How to Setup Pushover
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={{ backgroundColor: '#2c2c2c', color: '#ffffff' }}>
                    {/* X Button for Closing at the Top-Right */}
                    <Button
                        variant="light"
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '20px',
                            color: '#ffffff',
                        }}
                    >
                        ×
                    </Button>
                    <Modal.Title>Setting Up Pushover</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#333333', color: '#ffffff' }}>
                    <ol>
                        <li>
                            <strong>Create a Pushover Account:</strong>
                            <p>
                                Visit <a href="https://pushover.net" target="_blank" rel="noopener noreferrer" style={{ color: '#1e90ff' }}>Pushover.net</a> and sign up for a free account.
                            </p>
                        </li>
                        <li>
                            <strong>Download the Pushover App:</strong>
                            <p>
                                Install the Pushover app on your mobile device from the{' '}
                                <a href="https://play.google.com/store/apps/details?id=net.superblock.pushover" target="_blank" rel="noopener noreferrer" style={{ color: '#1e90ff' }}>Google Play Store</a> or the{' '}
                                <a href="https://apps.apple.com/us/app/pushover-notifications/id506088175" target="_blank" rel="noopener noreferrer" style={{ color: '#1e90ff' }}>Apple App Store</a>.
                            </p>
                        </li>
                        <li>
                            <strong>Get Your User Key:</strong>
                            <p>Once logged in, you will see your User Key on the dashboard. It’s a long string of characters. Copy this key.</p>
                        </li>
                        <li>
                            <strong>Link Pushover with Our Website:</strong>
                            <p>Navigate to your profile settings on our website and look for the 'Pushover Integration' section.</p>
                            <p>Paste your Pushover User Key into the appropriate field and save the settings.</p>
                        </li>
                        <li>
                            <strong>Test Notifications:</strong>
                            <p>After saving, you can send a test notification from your profile to ensure everything is working correctly.</p>
                        </li>
                        <li>
                            <strong>Set Up Notification Preferences:</strong>
                            <p>Customize your notification settings within the Pushover app or through our website's settings page as needed.</p>
                        </li>
                    </ol>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#2c2c2c', color: '#ffffff', justifyContent: 'flex-start' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PushoverSetupModal;
