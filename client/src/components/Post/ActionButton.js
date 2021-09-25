import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "./../../assets/icons/play-btn.svg";
import editIcon from "./../../assets/icons/pencil-square.svg";
import deleteIcon from "./../../assets/icons/trash.svg";
import { PostContext } from "../../contexts/PostContext";

const ActionButton = ({ url, _id }) => {
    const { destroyPost, getPostById, setShowUpdateModal } = useContext(
        PostContext
    );
    const choosePost = (postId) => {
        getPostById(postId);
        setShowUpdateModal(true);
    };
    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="Play" height="32" width="32" />
            </Button>
            <Button className="post-button">
                <img
                    src={editIcon}
                    height="24"
                    width="24"
                    alt="Edit"
                    _id={_id}
                    onClick={choosePost.bind(this, _id)}
                />
            </Button>
            <Button className="post-button">
                <img
                    src={deleteIcon}
                    height="24"
                    width="24"
                    alt="Delete"
                    onClick={destroyPost.bind(this, _id)}
                />
            </Button>
        </>
    );
};

export default ActionButton;
