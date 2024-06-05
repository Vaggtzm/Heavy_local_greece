// UserCards.js
import React, {useEffect, useState} from 'react';
import {getDatabase, ref, onValue, off} from 'firebase/database';
import {getDownloadURL, ref as storageRef} from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './author.css';
import {storage} from "../../../firebase";

const Author = ({userId, className, rating}) => {
    const [user, setUser] = useState([]);

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
        <div className={className}>
            <div className="d-flex justify-content-center mb-4">
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="rounded-circle shadow-1-strong" width="150" height="150"/>
            </div>
            <h5 className="mb-3 text-white">{user.displayName} </h5>
            <h6 className="text-primary mb-3 text-white">{user.role}</h6>
            <p className="px-xl-3 text-white">
                <i className="fas fa-quote-left pe-2"></i>
                {user.bio}
                <i className="fas fa-quote-right pe-2"></i>
            </p>

            <StarRating rating={rating}></StarRating>

        </div>
    );
};

export default Author;
