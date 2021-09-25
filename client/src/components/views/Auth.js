import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import "../../assets/css/auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
    let formbody;
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated, user } = authState;
    if (authLoading) {
        formbody = (
            <div className="d-flex justify-align-content-center">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) return <Redirect to="/home" />;
    else
        formbody = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    return (
        <div className="body-login">
            <div className="body__element">
                <div className="container-app">
                    <h2 className="container-app__element">
                        Learning Application
                    </h2>
                    <p className="container-app__element">
                        Keep track of what you are learning
                    </p>
                    <div className="container-app-form">
                        <div className="container-app-form__element">
                            {formbody}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
