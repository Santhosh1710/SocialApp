import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import React, { useContext , useState} from "react";
import { AuthContext } from "../../context/authContext";

function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const { login } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(inputs);
            navigate("/");
        }catch(err){
            setError(err.response?.data);
        }
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
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {error && <p>{error}</p>}
                        <button type="button" onClick={handleLogin}>Login</button> {/* Ensure to specify type="button" to prevent form submission */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
