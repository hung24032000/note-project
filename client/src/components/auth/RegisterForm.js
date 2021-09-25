import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
    const [userRegister, setUserRegister] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [alert, setAlert] = useState(null);
    const { registerUser } = useContext(AuthContext);
    const { username, password, confirmPassword } = userRegister;
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({
                type: "danger",
                message: "Password do not match",
            });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            const data = await registerUser({
                username,
                password,
            });
            if (data.success) {
                setAlert({
                    type: "success",
                    message: data.message,
                });
                setTimeout(() => setAlert(null), 5000);
            } else {
                setAlert({
                    type: "danger",
                    message: data.message,
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeValueImput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserRegister({ ...userRegister, [name]: value });
    };

    return (
        <>
            <Form onSubmit={handleOnSubmit}>
                <AlertMessage info={alert} />
                <Form.Group controlId="username" as={Row}>
                    <Form.Label className="custom-text-label-color">
                        Username:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        size="sm"
                        onChange={onChangeValueImput}
                        value={username}
                    />
                </Form.Group>
                <Form.Group controlId="password" as={Row}>
                    <Form.Label className="custom-text-label-color">
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        size="sm"
                        onChange={onChangeValueImput}
                        value={password}
                    />
                </Form.Group>
                <Form.Group controlId="ConfirmPassword" as={Row}>
                    <Form.Label className="custom-text-label-color">
                        Confirm Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="confirmPassword"
                        required
                        size="sm"
                        onChange={onChangeValueImput}
                        value={confirmPassword}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p style={{ color: "#d0d7dee6" }}>
                Already have an account ?<Link to="/login">Login</Link>
            </p>
        </>
    );
};

export default RegisterForm;
