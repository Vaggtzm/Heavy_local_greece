import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Col, Form, Row } from 'react-bootstrap';

function EditLinks({ initialHtmlString, setOutput }) {
    const [socials, setSocials] = useState({
        facebook: '',
        instagram: '',
        spotify: '',
        youtube: ''
    });

    useEffect(() => {
        const parsedHtml = parse(initialHtmlString?initialHtmlString:"");

        // Extract href values from the first <p> element
        if (parsedHtml && parsedHtml.type === 'p' &&parsedHtml.props.children) {
            parsedHtml.props.children.forEach((element) => {
                if (element.type === 'a' && element.props.href) {
                    if (element.props.href.includes('facebook.com')) {
                        setSocials((prev) => ({ ...prev, facebook: element.props.href }));
                    } else if (element.props.href.includes('instagram.com')) {
                        setSocials((prev) => ({ ...prev, instagram: element.props.href }));
                    } else if (element.props.href.includes('spotify.com')) {
                        setSocials((prev) => ({ ...prev, spotify: element.props.href }));
                    } else if (element.props.href.includes('youtube.com')) {
                        setSocials((prev) => ({ ...prev, youtube: element.props.href }));
                    }
                }
            });
        }
    }, [initialHtmlString]);

    useEffect(() => {
        const htmlString = `
<p class='lead'>
  ${socials.facebook ? `<a href='${socials.facebook}'><i class='bi bi-facebook'></i></a>` : ''}
  ${socials.instagram ? `<a href='${socials.instagram}'><i class='bi bi-instagram'></i></a>` : ''}
  ${socials.spotify ? `<a href='${socials.spotify}'><i class='bi bi-spotify'></i></a>` : ''}
  ${socials.youtube ? `<a href='${socials.youtube}'><i class='bi bi-youtube'></i></a>` : ''}
</p>`;
        setOutput(htmlString);
    }, [socials]);

    return (
        <Form.Group controlId="socials">
            <Form.Label className={"text-light"}>
                Social Media Links <span className={"small"}>(enter only those available)</span>
            </Form.Label>
            <Row>
                <Col>
                    <Form.Label>Facebook:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Facebook"
                        value={socials.facebook}
                        onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                    />
                </Col>
                <Col>
                    <Form.Label>Instagram:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Instagram"
                        value={socials.instagram}
                        onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Form.Label>Spotify:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Spotify"
                        value={socials.spotify}
                        onChange={(e) => setSocials({ ...socials, spotify: e.target.value })}
                    />
                </Col>
                <Col>
                    <Form.Label>YouTube:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="YouTube"
                        value={socials.youtube}
                        onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                    />
                </Col>
            </Row>
        </Form.Group>
    );
}

export default EditLinks;
