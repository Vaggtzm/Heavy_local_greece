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

// src/components/GigDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database, storage } from '../../firebase';
import { Container, Spinner } from 'react-bootstrap';
import { listAll, ref as storageRef } from 'firebase/storage';
import PrimaryCarousel from "../../components/HomeCompoments/PrimaryCarousel/PrimaryCarousel";

const GigDetailPage = () => {
    const { date } = useParams();
    const [gig, setGig] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const gigRef = ref(database, `gigs/${date}`);
        onValue(gigRef, (snapshot) => {
            const data = snapshot.val();
            setGig(data);
        });

        const photosRef = storageRef(storage, `gigs/${date}`);
        listAll(photosRef)
            .then((result) => {
                const promises = result.items.map((itemRef) => {
                        return `gigs/${date}/${itemRef.name}`
                    }
                );
                setPhotos(promises);
                setLoading(false);
            })
    }, [date]);

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto" />;
    }

    return (
        <Container className="mt-5">
            {gig && (
                <>
                    <h1 className="text-center mb-5 text-white">{gig.title}</h1>
                    <p className="text-center mb-5 text-white">{gig.description}</p>
                    <PrimaryCarousel
                        customImages={photos}
                        classNameImages={"m-3 border border-white rounded border-5 img-fluid"}
                    />
                </>
            )}
        </Container>
    );
};

export default GigDetailPage;
