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
// ReportedCommentsContainer.js
import React, {useEffect, useState} from 'react';
import {get, ref, remove} from 'firebase/database';
import {Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useNavigate from "../../components/LanguageWrapper/Navigation";
import {auth, database} from "../../firebase";

const ReportedCommentsContainer = () => {
    const [reportedComments, setReportedComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async (user) => {
            const commentAdminRef = ref(database, `roles/comments`);
            const snapshot = await get(commentAdminRef);
            if (snapshot.exists() && snapshot.val().includes(user.email)) {
                setIsAdmin(true);
            } else {
                navigate("/");
            }
        };

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await checkAdmin(user);
                fetchReportedComments();
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchReportedComments = async () => {
        setLoading(true);
        const reportedCommentsRef = ref(database, `reported_comments`);
        const snapshot = await get(reportedCommentsRef);
        const data = snapshot.val() || {};

        const comments = [];
        for (const articleName in data) {
            for (const commentId in data[articleName]) {
                const commentReport = data[articleName][commentId];
                const commentPath = commentReport.parent
                    ? `comments/${articleName}/${commentReport.parent}/replies/${commentId}`
                    : `comments/${articleName}/${commentId}`;

                const commentRef = ref(database, commentPath);
                const commentSnapshot = await get(commentRef);

                if (commentSnapshot.exists()) {
                    comments.push({
                        id: commentId,
                        articleName,
                        ...commentSnapshot.val(),
                        commentPath,
                    });
                }
            }
        }

        setReportedComments(comments);
        setLoading(false);
    };

    const handleCardClick = (articleName, commentId) => {
        navigate(`/article/${articleName}?commentId=${commentId}`);
    };

    const handleRemoveComment = async (commentPath, commentId) => {
        await remove(ref(database, commentPath));
        await remove(ref(database, `reported_comments/${commentPath.split('/')[1]}/${commentId}`));
        fetchReportedComments().then();
    };

    if (!isAdmin) {
        return <p>You do not have permission to view reported comments.</p>;
    }

    return (
        <Container className="mt-4 text-white">
            <h3>Reported Comments</h3>
            {loading ? (
                <Spinner animation="border"/>
            ) : reportedComments.length === 0 ? (
                <p>No reported comments.</p>
            ) : (
                <Row>
                    {reportedComments.map((comment) => (
                        <Col key={comment.id} md={6} lg={4} className="mb-4">
                            <Card className="bg-dark text-white">
                                <Card.Body>
                                    <Card.Title>{comment.displayName}</Card.Title>
                                    <Card.Text>{comment.text}</Card.Text>
                                    <div className={"d-flex justify-content-between"}>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveComment(comment.commentPath, comment.id)}
                                        >
                                            Remove Comment
                                        </Button>

                                        <Button
                                            variant="info"
                                            onClick={() => handleCardClick(comment.articleName, comment.id)}
                                        >
                                            View Comment
                                        </Button>
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

export default ReportedCommentsContainer;

