import { Link } from "react-router-dom";
import "./signup.scss";
import React from "react";
function signup() {
  return (
    <div className="signup">
        <div className="card">
            <div className="left">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username"/>
                    <input type="email" placeholder="E-Mail"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button>Register</button>
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
  )
}

export default signup