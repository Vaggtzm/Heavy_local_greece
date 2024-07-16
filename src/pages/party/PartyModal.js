// PartyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import IoanninaImage from './assets/ioannina.jpg';
import useNavigate from "../../components/LanguageWrapper/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

const PartyModal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsModalOpen] = useState(true);
    const onRequestClose = () => {
        setIsModalOpen(false);
    }

    const calculateTimeLeft = () => {
        const difference = +new Date('2024-07-26') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const handleRedirect = () => {
        navigate("/party");
        onRequestClose();
    };

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <Modal
            show={isOpen}
            onHide={onRequestClose}
            size="lg"
            centered
        >
            <div className="p-3 text-center bg-light">
                <div className="position-relative" style={{ backgroundImage: `url(${IoanninaImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '50vh' }}>
                    <Button variant="secondary" className="position-absolute top-0 end-0 m-2" onClick={onRequestClose}>X</Button>
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white bg-dark bg-opacity-50">
                        <h2>Πάρτι Επέτειος!</h2>
                        <div className="d-flex justify-content-center align-items-center">
                            <span style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                padding: "10px",
                                borderRadius: "10px"
                            }} className="mx-1">{days}d</span> :
                            <span style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                padding: "10px",
                                borderRadius: "10px"
                            }} className="mx-1">{hours}h</span> :
                            <span style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                padding: "10px",
                                borderRadius: "10px"
                            }} className="mx-1">{minutes}m</span> :
                            <span style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                padding: "10px",
                                borderRadius: "10px"
                            }} className="mx-1">{seconds}s</span>
                        </div>
                        <Button style={{
                            background: "#800080"
                        }} variant="button" size={"lg"} className="mt-3 text-white" onClick={handleRedirect}>Learn More</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PartyModal;
