// UserCards.js
import React, {useEffect, useState} from 'react';
import {getDatabase, off, onValue, ref} from 'firebase/database';
import {getDownloadURL, ref as storageRef} from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './author.css';
import {storage} from "../../../firebase";
import {NavLink} from "react-router-dom";
import { Card, Image, Button } from 'react-bootstrap';
import { Tilt } from 'react-tilt'

const Author = ({userId, className, rating}) => {
    const [user, setUser] = useState([]);

    const defaultOptions = {
        reverse:        false,  // reverse the tilt direction
        max:            35,     // max tilt rotation (degrees)
        perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed:          1000,   // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,    // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }
    

    useEffect(() => {
        const database = getDatabase();
        const usersRef = ref(database, `authors/${userId}`);

        const unsubscribe = onValue(usersRef, async (snapshot) => {
            const usersData = snapshot.val();
            const imageRef = storageRef(storage, `profile_images/${userId}_600x600`);
            usersData.photoURL = await getDownloadURL(imageRef);

            setUser(usersData);
        });


        return () => {
            off(usersRef, 'value', unsubscribe);
        };
    }, [userId]);

    function StarRating({rating}) {
        const fullStars = Math.floor(rating);
        const partialStar = rating - fullStars > 0;

        return (
            <ul className="list-unstyled d-flex justify-content-center mb-0">
                {Array(5) // Render 5 stars (adjust for different count)
                    .fill(null)
                    .map((_, index) => (
                        <li key={index}>
                            {index < fullStars ? (
                                <i className="fas fa-star fa-sm text-warning"></i>
                            ) : partialStar && index === fullStars ? (
                                <i className="fas fa-star-half-alt fa-sm text-warning"></i>
                            ) : (
                                <i className="far fa-star fa-sm text-warning"></i> // Empty star
                            )}
                        </li>
                    ))}
            </ul>
        );
    }

    return (
        <NavLink className={`${className} nav-link`} to={`/author/${userId}`}>
            <Tilt className="Tilt" options={defaultOptions}>
                <div className="ms-5 Tilt-inner">
                    <Card className="shadow bg-dark text-white rounded-4 p-4 w-100">
                        <div className="d-flex justify-content-center mb-4 w-100">
                            <Image
                                src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-4"
                                width="150"
                                height="150"
                                roundedCircle
                            />
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title className="mb-3">{user.displayName}</Card.Title>
                            <Card.Subtitle className="mb-3 text-primary">{user.role}</Card.Subtitle>
                            <hr className="text-light w-75 mx-auto" />
                            <Card.Text className="px-xl-3">
                                <i className="fas fa-quote-left pe-2"></i>
                                {user.bio}
                                <i className="fas fa-quote-right ps-2"></i>
                            </Card.Text>
                            <StarRating rating={rating} />
                        </Card.Body>
                    </Card>
                </div>
            </Tilt>
        </NavLink>
    );
};

export default Author;
