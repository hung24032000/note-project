import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/authReducer";
import { urlAPI, LOCAL_TOKEN_NAME, SET_AUTH } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Checking for authorization
    const loadUser = async () => {
        if (localStorage[LOCAL_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${urlAPI}/auth`);

            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => loadUser(), []);

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${urlAPI}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_TOKEN_NAME, response.data.token);
            }
            await loadUser();
            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            }
            return { success: false, message: error.message };
        }
    };

    const registerUser = async (userObj) => {
        try {
            const response = await axios.post(
                `${urlAPI}/auth/register`,
                userObj
            );

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            }
            return { success: false, message: error.message };
        }
    };

    const AuthContextData = {
        authState,
        dispatch,
        loginUser,
        loadUser,
        registerUser,
    };
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
