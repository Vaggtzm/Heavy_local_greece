/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// src/components/GigsPage.js
import React, { useEffect, useState } from 'react';
import {ref, onValue, get} from 'firebase/database';
import {database, storage} from '../../firebase';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import NavLink from "../../components/LanguageWrapper/NavLink";
import {ref as storageRef, getDownloadURL} from "firebase/storage";

const GigsPage = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getThumbnailUrl = async (gig, thumbnail) => {
        try {
            const photoRef = storageRef(storage, `/gigs/${gig}/${thumbnail}`);
            return await getDownloadURL(photoRef);
        }catch (e) {
            console.log(e);
            return null;
        }
    }

    useEffect(() => {
        const gigsRef = ref(database, 'gigs');
        console.log("Waiting for gigs");
        get(gigsRef).then(async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const gigsList = await Promise.all(Object.keys(data).map(async (key) => {
                    return {
                        date: key,
                        thumbnailURL: await getThumbnailUrl(key, data[key].thumbnail),
                        ...data[key],
                    }
                }));
                setGigs(gigsList);
            }
            setLoading(false);
        });
    }, []);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-5 text-white">Gigs</h1>
            {loading ? (
                <Spinner animation="border" className="d-block mx-auto" />
            ) : (
                <Row className={"d-flex justify-content-evenly"}>
                    {gigs.map((gig) => (
                        <Col key={gig.date} className="mb-4">
                            <Card className={"m-4"}>
                                <Card.Img
                                    variant="top"
                                    src={gig.thumbnailURL || 'placeholder.jpg'}
                                />
                                <Card.Body >
                                    <Card.Title className={"text-center"}>{gig.title}</Card.Title>
                                    <Card.Text>{gig.description}</Card.Text>
                                    <div className={"d-flex justify-content-center"}>
                                    <NavLink to={`/gigs/${gig.date}`} className="btn text-white" style={{backgroundColor:"#05021f"}}>
                                        View Gig
                                    </NavLink>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default GigsPage;