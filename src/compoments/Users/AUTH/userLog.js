import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import './auth.css'
import UserNav from "../UserNav";

const UserLog = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/User");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <UserNav />
      <div className="container">
        <h4 className="display-4 m-3 p-1">Login</h4>
        <hr className="bg-dark"></hr>
        <form>
          <div>
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control m-2"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control m-2"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <button
                className="btn btn-outline-secondary rounded-circle"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {passwordLengthError && (
              <p className="text-danger">Password must be at least 8 characters long.</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-danger m-2"
            onClick={onLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLog;
