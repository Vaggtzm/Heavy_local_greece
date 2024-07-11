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

// CommentSystem.js
import React, { useEffect, useState, useRef } from 'react';
import { onValue, push, ref, set, update } from 'firebase/database';
import { auth } from '../../../firebase'; // Import Firebase auth
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { database } from '../../../firebase';
import { CommentAuthor } from "./CommentAuthor";
import { getIdTokenResult } from "firebase/auth";

const CommentSystem = ({ articleName }) => {
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const replyInputRef = useRef(null);

    useEffect(() => {
        const commentsRef = ref(database, `comments/${articleName}`);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            setComments(data || {});
        });
    }, [articleName]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await getIdTokenResult(user);

                let userFolder;
                if (idTokenResult.claims && idTokenResult.claims.admin) {
                    userFolder = 'authors';
                } else {
                    userFolder = 'users';
                }
                const userRef = ref(database, `${userFolder}/${user.uid}`);
                await update(userRef, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL || ''
                });

                setCurrentUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handlePostComment = () => {
        if (newComment.trim() && currentUser) {
            const commentsRef = ref(database, `comments/${articleName}`);
            const newCommentRef = push(commentsRef);
            set(newCommentRef, {
                text: newComment,
                user: currentUser.uid,
                displayName: currentUser.displayName,
                timestamp: Date.now(),
                replies: {},
            });
            setNewComment('');
        }
    };

    const handlePostReply = async (parentId) => {
        if (replyComment.trim() && parentId && currentUser) {
            const repliesRef = ref(database, `comments/${articleName}/${parentId}/replies`);
            const newReplyRef = push(repliesRef);
            await set(newReplyRef, {
                text: replyComment,
                user: currentUser.uid,
                displayName: currentUser.displayName, // Use displayName instead of uid
                timestamp: Date.now(),
            });

            setReplyComment('');
            setReplyTo(null);
        }
    };

    const renderComments = (comments, parent, shouldLeaveMargin) => {
        return Object.keys(comments).map((key) => {
            const comment = comments[key];
            return (
                <Card key={key} className={`w-100 rounded-4 bg-dark text-white ${shouldLeaveMargin?"mb-3":""}`}>
                    <Card.Body>
                        <Card.Title>
                            <CommentAuthor authorCode={comment.displayName} />
                        </Card.Title>
                        <Card.Text>{comment.text}</Card.Text>
                        {currentUser ? (
                            <Button
                                variant="link"
                                className={`rounded-5 ${(!currentUser)?"disabled":""}`}
                                onClick={() => {
                                    setReplyTo(parent ? parent : key);
                                    setTimeout(() => {
                                        if (replyInputRef.current) replyInputRef.current.focus();
                                    }, 0);
                                }}
                                disabled={!currentUser}
                            >
                                Reply
                            </Button>
                        ) : (
                            <p className="text-secondary">You need to be logged in to reply</p>
                        )}
                        {replyTo === key && (
                            <InputGroup className="mb-3 row w-100">
                                <div className={"col-12 col-md-8"}>
                                    <Form.Control
                                        ref={replyInputRef}
                                        className={"bg-dark text-white"}
                                        placeholder="Write a reply..."
                                        value={replyComment}
                                        onChange={(e) => setReplyComment(e.target.value)}
                                    />
                                </div>
                                <div className={"col-12 col-md-4 d-flex justify-content-center mt-3 mt-md-0"}>
                                    <Button
                                        variant="outline-secondary"
                                        className="rounded-3"
                                        onClick={() => handlePostReply(key)}
                                    >
                                        Post Reply
                                    </Button>
                                </div>
                            </InputGroup>
                            )}
                        {comment.replies &&
                            <div className="ml-4 shadow-lg border border-secondary pt-3 p-1">{renderComments(comment.replies, key, true)}</div>
                            }
                        </Card.Body>
                            </Card>
            );
        });
    };

    return (
        <div className="container mt-4">
            <Card className="mb-3 bg-dark text-white w-100 rounded-4">
                <Card.Body>
                    <Form.Control
                        placeholder="Write a comment..."
                        value={newComment}
                        className={"bg-dark text-white"}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        className="mt-2 rounded-5"
                        onClick={handlePostComment}
                        disabled={!currentUser}
                    >
                        {(!currentUser)?"Log In to Post":"Post Comment"}
                    </Button>
                </Card.Body>
            </Card>

                {Object.keys(comments).length > 0 ? (
                    renderComments(comments, null, false)
                ) : (
                    <p>No comments yet.</p>
                )}
        </div>
    );
};

export default CommentSystem;
