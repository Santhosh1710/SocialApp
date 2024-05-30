import { Link } from "react-router-dom";
import "./signup.scss";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email: "",
        password: "" 
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBlur = () => {
        if (inputs.password !== inputs.confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            setError("Passwords do not match");
            return;
        }else{
            setError("");
        }
        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs);
        }catch(err){
            setError(err.response?.data)
        }
    };

    return (
        <div className="signup">
            <div className="card">
                <div className="left">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            placeholder="E-Mail"
                            name="email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Register</button>
                    </form>
                </div>
                <div className="right">
                    <h1>Welcome to Social App</h1>
                    <p>Connect with friends and the world around you on Social App.</p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
