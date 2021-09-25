import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = (props) => {
    const {
        showUpdateModal,
        setShowUpdateModal,
        updatePost,
        postState: { post },
    } = useContext(PostContext);

    const closeDialog = () => {
        setShowUpdateModal(false);
    };

    const [updatePostState, setUpdatePostState] = useState(post);
    const { title, description, url, status, _id } = updatePostState;
    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUpdatePostState({ ...updatePostState, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { success, message } = await updatePost(updatePostState);
        closeDialog();
    };

    return (
        <Modal
            show={showUpdateModal}
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
                    <Form.Group>
                        <Form.Control
                            as="select"
                            name="status"
                            onChange={handleOnChange}
                            value={status}
                        >
                            <option value="To Learn">To Learn</option>
                            <option value="Learning">Learning</option>
                            <option value="Learned">Learned</option>
                        </Form.Control>
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

export default UpdatePostModal;
