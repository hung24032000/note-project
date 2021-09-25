import { createContext, useReducer, useState } from "react";
import {
    GET_POST_ALL,
    POSTS_LOADED_FAIL,
    urlAPI,
    STORE_POST,
    DESTROY_POST,
    UPDATE_POST,
    GET_POST_BY_ID,
} from "./constants";
import { PostReducer } from "./../reducers/postReducer";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
        postLoading: true,
        post: null,
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${urlAPI}/post/store`, newPost);
            if (response.data.success) {
                dispatch({
                    type: STORE_POST,
                    payload: response.data.post,
                });

                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    const getPostById = async (_id) => {
        try {
            const response = await axios.get(`${urlAPI}/post/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: GET_POST_BY_ID,
                    payload: response.data.post[0],
                });
            }

            return response.data;
        } catch (error) {
            dispatch({
                type: GET_POST_BY_ID,
                payload: null,
            });
        }
    };
    const getPosts = async () => {
        try {
            const response = await axios.get(`${urlAPI}/post`);
            if (response.data.success) {
                dispatch({
                    type: GET_POST_ALL,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL,
                payload: {
                    posts: [],
                    postLoading: false,
                },
            });
        }
    };
    const destroyPost = async (_id) => {
        try {
            const response = await axios.delete(`${urlAPI}/post/${_id}`);
            if (response.data.success) {
                dispatch({
                    type: DESTROY_POST,
                    payload: _id,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error);
            // return error.response.data
            //     ? error.response.data
            //     : { success: false, message: "Server error" };
        }
    };

    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(
                `${urlAPI}/post/${updatedPost._id}`,
                updatedPost
            );
            if (response.data.success) {
                console.log(response.data.post);
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };
    const PostContextData = {
        postState,
        getPosts,
        dispatch,
        showAddModal,
        setShowAddModal,
        showUpdateModal,
        setShowUpdateModal,
        addPost,
        destroyPost,
        updatePost,
        getPostById,
    };
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
