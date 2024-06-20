import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col className="text-center">
                    <h1 className="display-1">{t('notFoundTitle')}</h1>
                    <h2>{t('notFoundSubtitle')}</h2>
                    <p className="lead">{t('notFoundDescription')}</p>
                    <Button variant="primary" as={Link} to="/">{t('goBackHome')}</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
