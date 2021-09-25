import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "../../assets/css/app.css";
import ProfileUser from "../layout/ProfileUser";
import NavbarMenu from "../layout/NavbarMenu";
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    if (authLoading) {
        return <div className="spinner-container">Loadding...</div>;
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavbarMenu>
                            <ProfileUser />
                        </NavbarMenu>
                        <Component {...props} {...rest} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
