import React, { useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Row from "react-bootstrap/Row";
import SinglePost from "../Post/SinglePost";
import AddPostModal from "../Post/AddPostModal";
import UpdatePostModal from "../Post/UpdatePostModal";

import addIcon from "./../../assets/icons/plus-circle.svg";

const DashBoard = () => {
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const { postState, getPosts, setShowAddModal } = useContext(PostContext);
    const { posts, postLoading, post } = postState;
    useEffect(() => getPosts(), []);
    let body = null;
    if (postLoading) {
        body = <div>loading....</div>;
    }
    if (posts.length === 0) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as="h1">Hi {{ username }}</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to Application</Card.Title>
                    <Card.Text>
                        Click here to start creating a new post
                    </Card.Text>
                    <Button variant="primary"> Learn</Button>
                </Card.Body>
            </Card>
        );
    }
    body = (
        <>
            <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                {posts.map((post) => (
                    <Col key={post._id}>
                        <SinglePost post={post}></SinglePost>
                    </Col>
                ))}
            </Row>
            <Button
                className="btn-floating"
                onClick={setShowAddModal.bind(this, true)}
            >
                <img
                    src={addIcon}
                    alt="Add-Post"
                    width="50"
                    height="50"
                    className="icon-post"
                />
            </Button>
        </>
    );
    return (
        <>
            {body}
            <AddPostModal />
            {post != null && <UpdatePostModal />}
        </>
    );
};

export default DashBoard;
