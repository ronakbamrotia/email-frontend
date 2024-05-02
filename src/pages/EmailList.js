import React, { useEffect, useState } from "react";
import { Badge, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

import CONSTANT from "../constants";

function EmailList() {
    const [emailNotificationList, setEmailNotificationList] = useState([]);
    const [emailData, setEmailData] = useState(null)
    const [lgShow, setLgShow] = useState(false);

    async function fetchEmailNotificationList(uuid = "") {
        const response = await axios.get(`${CONSTANT.API_BASE_URL}/api/email-notification-list`);
        setEmailNotificationList(response.data.data);
    }

    useEffect(() => {
        fetchEmailNotificationList();
    }, []);

    function renderStatus(status = "Pending") {
        let badge = "";
        switch (status) {
            case "Pending":
                badge = <Badge bg="warning">{status}</Badge>
                break;
            case "Sent":
                badge = <Badge bg="success">{status}</Badge>
                break;
            case "Error":
                badge = <Badge bg="danger">{status}</Badge>
                break;
            default:
                badge = <Badge bg="warning">{status}</Badge>
        }
        return badge;
    }

    async function fetchEmailData(uuid = "") {
        try {
            const response = await axios.get(`${CONSTANT.API_BASE_URL}/api/email-notification/${uuid}`);
            setEmailData(response.data.data);
            setLgShow(true);
        } catch (e) {
        }
    }

    return (
        <div className="App">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Template</th>
                        <th>Subject</th>
                        <th>Email</th>
                        <th>Bcc</th>
                        <th>Send At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emailNotificationList.map(el => {
                            return (
                                <tr key={el.uuid}>
                                    <td>{el.key}</td>
                                    <td>{el.subject}</td>
                                    <td>{el.email.join(", ")}</td>
                                    <td>{el.bcc.join(", ")}</td>
                                    <td>{el.delayed_send ? el.delayed_send : "Immediately"}</td>
                                    <td>{renderStatus(el.status)}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => fetchEmailData(el.uuid)}>
                                            View Email
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => { setLgShow(false); setEmailData(null); }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="test">
                        {emailData && emailData.subject}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "block", margin: "0 auto" }}><div style={{ display: "block" }} dangerouslySetInnerHTML={{ __html: (emailData && emailData.body) }} /></Modal.Body>
            </Modal>
        </div>
    );
}

export default EmailList;
