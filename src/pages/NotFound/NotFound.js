import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const { t } = useTranslation();

    const [excuse, setExcuse] = useState('');

    const fetchExcuse = () => {
        fetch("https://bofh-api.bombeck.io/v1/excuses/random").then((response) => {
            response.json().then((data) => {
                console.log(data);
                setExcuse(data[0].quote);
            });
        })
    }

    useEffect(() => {
        fetchExcuse();
    }, []);

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className={"not-found-container h-75 w-100 p-5"}>
                <Col className="text-center">
                    <h1 className="display-1 text-white animate__animated animate__fadeInDown">{t('notFoundTitle')}</h1>
                    <h2 className="text-white animate__animated animate__fadeInDown">{t('notFoundSubtitle')}</h2>
                    <p className="lead text-white animate__animated animate__fadeIn animate__delay-1s">{excuse}</p>
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" as={Link} to="/" className="mx-4 btn-lg animate__animated animate__pulse animate__infinite">{t('goBackHome')}</Button>
                        <Button variant="secondary" onClick={fetchExcuse} className="mx-2 btn-lg animate__animated animate__shakeX animate__infinite">{t('fetchExcuse')}</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
