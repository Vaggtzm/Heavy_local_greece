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
import React, {useEffect, useState} from 'react';
import {get, onValue, ref, remove, update} from 'firebase/database';
import {deleteObject, getStorage, ref as storageRef} from 'firebase/storage';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {auth, database} from "../../firebase";
import {deleteImage, getFirebaseStorageUrlFromPath} from "../../components/UploadSystem/articleData/articleData";

const AdView = () => {
    const [ads, setAds] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (!!user) {
                setCurrentUser(user);

                // Check if user is admin
                const adminRef = ref(database, 'roles/ads');
                const snapshot = await get(adminRef);
                if (snapshot.exists()) {
                    let admins = snapshot.val();
                    if (!admins) {
                        admins = [];
                    }
                    if (admins.includes(user.email)) {
                        setIsAdmin(true);
                    }
                }
            }
        });

        const adsRef = ref(database, 'ads');

        const unsubscribeAds = onValue(adsRef, async (snapshot) => {
            const adsData = snapshot.val();
            const adsList = [];

            for (let key in adsData) {
                const ad = adsData[key];
                const adWithKey = { ...ad, key };
                if(adWithKey.imageURL) {
                    adWithKey.imageURL = await getFirebaseStorageUrlFromPath(ad.imageURL, true);
                }
                adsList.push(adWithKey);
            }

            setAds(adsList);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeAds();
        };
    }, []);

    const handleApproval = async (id, approved) => {
        const adRef = ref(database, `ads/${id}`);
        if (approved) {
            await update(adRef, { status: 'approved' });
            setAds(ads.map(ad => ad.key === id ? { ...ad, status: 'approved' } : ad));
        } else {
            // Delete the ad and its associated image if rejected
            const ad = ads.find(ad => ad.key === id);
            deleteImage(ad.imageURL)
            await remove(adRef);
            setAds(ads.filter(ad => ad.key !== id));
        }
    };

    const handleDelete = async (id) => {
        const ad = ads.find(ad => ad.key === id);
        const adRef = ref(database, `ads/${id}`);
        const storage = getStorage();
        if(ad.imageURL) {
            const imageRef = storageRef(storage, ad.imageURL);
            await deleteObject(imageRef);
        }
        await remove(adRef);
        setAds(ads.filter(ad => ad.key !== id));
    };

    const sortedAds = ads.sort((a, b) => {
        if (isAdmin) {
            return a.status === 'pending' ? -1 : 1;
        } else {
            if(a.userId === currentUser.uid){
                return -1
            }else{
                if(b.userId === currentUser.uid){
                    return 1
                }else{
                    return 0;
                }
            }
        }
    });

    return (
        <Container>
            <Row>
                {sortedAds.map((ad) => (
                    (ad.status === 'approved' || isAdmin) && (
                        <Col key={ad.key} sm={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Img variant="top" src={ad.imageURL} />
                                <Card.Body>
                                    <Card.Title>{ad.title}</Card.Title>
                                    <Card.Text>{ad.description}</Card.Text>
                                    <div className={"w-100 d-flex justify-content-evenly"}>
                                        {isAdmin && ad.status === 'pending' && (
                                            <Button variant="success"
                                                    onClick={() => handleApproval(ad.key, true)}>Approve</Button>
                                        )}
                                        {(currentUser && (currentUser.uid === ad.userId || isAdmin)) && (
                                            <Button variant="danger"
                                                    onClick={() => handleDelete(ad.key)}>Delete</Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                ))}
            </Row>
        </Container>
    );
};

export default AdView;
