import {
    DESTROY_POST,
    GET_POST_ALL,
    GET_POST_BY_ID,
    POSTS_LOADED_FAIL,
    STORE_POST,
    UPDATE_POST,
} from "../contexts/constants";
export const PostReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST_ALL: {
            return { ...state, posts: payload };
        }
        case POSTS_LOADED_FAIL: {
            return { ...state, posts: payload };
        }
        case STORE_POST: {
            return { ...state, posts: [...state.posts, payload] };
        }
        case DESTROY_POST: {
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
            };
        }
        case UPDATE_POST: {
            const newPosts = state.posts.map((post) =>
                post._id === payload._id ? payload : post
            );
            return { ...state, posts: newPosts };
        }
        case GET_POST_BY_ID: {
            return { ...state, post: payload };
        }
        default:
            return state;
    }
};
