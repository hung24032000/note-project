import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./components/views/About";
import Auth from "./components/views/Auth";
import DashBoard from "./components/views/DashBoard";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route
                            exact
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute="login" />
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            render={(props) => (
                                <Auth {...props} authRoute="register" />
                            )}
                        />
                        <ProtectedRoute
                            exact
                            path="/home"
                            component={DashBoard}
                        />
                        <ProtectedRoute exact path="/about" component={About} />
                    </Switch>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
