import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = (props) => {
    const { showAddModal, setShowAddModal, addPost } = useContext(PostContext);

    const closeDialog = () => {
        setShowAddModal(false);
        setPost({
            title: "",
            description: "",
            url: "",
            status: "To Learn",
        });
    };
    const [post, setPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "To Learn",
    });
    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPost({ ...post, [name]: value });
    };
    const { title, description, url } = post;

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await addPost(post);
        closeDialog();
    };

    return (
        <Modal
            show={showAddModal}
            className="mt-5 mx-auto"
            animation={false}
            onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleOnSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            onChange={handleOnChange}
                            value={title}
                        />
                        <Form.Text id="title-help" muted>
                            Require
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            onChange={handleOnChange}
                            value={description}
                        />
                        <Form.Text id="title-help" muted>
                            Require
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial Url"
                            name="url"
                            onChange={handleOnChange}
                            value={url}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
