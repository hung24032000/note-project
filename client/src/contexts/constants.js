export const urlAPI =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "UrlDeployee";
export const SET_AUTH = "SET_AUTH";
export const LOCAL_TOKEN_NAME = "my-token";
export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const GET_POST_ALL = "GET_POST_ALL";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const STORE_POST = "STORE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DESTROY_POST = "DESTROY_POST";
