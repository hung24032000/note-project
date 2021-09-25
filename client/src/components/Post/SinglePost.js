import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButton from "./ActionButton";

function SinglePost({ post }) {
    const {
        title,
        status,
        description,
        url,
        user: { username },
        _id,
    } = post;
    return (
        <Card
            className="text-center shadow mt-3"
            border={
                status === "Learned"
                    ? "success"
                    : status === "Learning"
                    ? "warning"
                    : "danger"
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p>{title}</p>
                            <Badge
                                pill
                                variant={
                                    status === "Learned"
                                        ? "success"
                                        : status === "Learning"
                                        ? "warning"
                                        : "danger"
                                }
                            >
                                {status}
                            </Badge>
                        </Col>
                        <Col className="text-right">
                            <ActionButton url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default SinglePost;
