import { Link } from "react-router-dom";
import "./login.scss";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Login() {
    const { login } = useContext(AuthContext);
    login();
    const handleLogin = () => {
        // login();

        // Redirect user to home page
        window.location.href = "/";
    }
    
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Welcome to Social App</h1>
                    <p>Connect with friends and the world around you on Social App.</p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button type="button" onClick={handleLogin}>Login</button> {/* Ensure to specify type="button" to prevent form submission */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
