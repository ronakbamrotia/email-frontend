import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

import axios from "axios";

import CONSTANT from "../constants";

function Home() {
    const [key, setKey] = useState("");
    const [subject, setSubject] = useState("");
    const [delayedSend, setDelayedSend] = useState("");
    const [name, setName] = useState("");
    const [days, setDays] = useState("");
    const [linkLabel, setLinkLabel] = useState("");
    const [linkURL, setLinkURL] = useState("");
    const [email, setEmail] = useState("");
    const [bcc, setBcc] = useState("");

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleClick() {
        setLoading(true);
        setError("");
        setMessage("");
        const requestBody = {
            "key": key,
            "subject": subject,
            "delayed_send": delayedSend ? delayedSend + "Z" : null,
            "body_data": {
                "name": name,
                "days": days,
                "link": {
                    "label": linkLabel,
                    "url": linkURL
                }
            },
            "email": email ? email.split(",") : [],
            "bcc": bcc ? bcc.split(",") : []
        }

        try {
            const response = await axios.post(`${CONSTANT.API_BASE_URL}/api/send-email-notification`, requestBody);
            setMessage(response.data.message);
            setLoading(false);
            setTimeout(() => {
                navigate("/email-list");
            }, 3000);
        } catch (e) {
            if (e.response.data.errors && e.response.data.errors.length > 0) {
                const errorArray = e.response.data.errors.map(er => er.msg);
                setError([...new Set(errorArray)].join(", "))
            }
            setLoading(false);
        }
    }

    return (
        <div className="App">
            {
                message ? (<Alert variant={"success"}>{message}</Alert>) : null
            }
            {
                error ? (<Alert variant={"danger"}>{error}</Alert>) : null
            }
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Key: </Form.Label>
                    <Col sm="6">
                        <Form.Select aria-label="Select Email Template" name="key" value={key} onChange={e => setKey(e.target.value)}>
                            <option value="">Select Email Template</option>
                            <option value="cloud-trial-expiry-template">Cloud trial expiry Template</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Subject: </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="subject" value={subject} onChange={e => setSubject(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Delayed Send: </Form.Label>
                    <Col sm="6"><Form.Control type="datetime-local" name="delayedSend" value={delayedSend} onChange={e => setDelayedSend(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Name: </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="name" value={name} onChange={e => setName(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Days: </Form.Label>
                    <Col sm="6"><Form.Control type="number" name="days" value={days} onChange={e => setDays(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Link Label: </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="linkLabel" value={linkLabel} onChange={e => setLinkLabel(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Link URL: </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="linkURL" value={linkURL} onChange={e => setLinkURL(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Email (comma separated): </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Bcc (comma separated): </Form.Label>
                    <Col sm="6"><Form.Control type="text" name="bcc" value={bcc} onChange={e => setBcc(e.target.value)} /></Col>
                </Form.Group>
                <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                >
                    {isLoading ? "Sending..." : "Send Email"}
                </Button>
            </Form>
        </div >
    );
}

export default Home;
