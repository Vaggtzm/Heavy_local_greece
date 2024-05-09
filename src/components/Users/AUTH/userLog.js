import React, { useState } from "react";
import {signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import './auth.css'
import {Alert, Button} from "react-bootstrap";
import AppNav from "../../AppNav/AppNav";
const UserLog = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const sendVerification= async () => {
    try {
      await sendEmailVerification(user);
      setError("Email verification has been sent. Please check your inbox");
      setEmailVerification(false);
    }catch(error){
      setError(error.message);
    }
  }

  const onLogin = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          navigate("/User/home");
          console.log(user);
        } else {
          setError("Please verify your email before signing in");
          setEmailVerification(true);
          setUser(user);
          await signOut(auth);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        //TODO: Change it to display th message properly
        setError(errorMessage);
      });
  };

  return (
    <>
      <AppNav />
      <div className="container">
        <h4 className="display-4 m-3 p-1">Login</h4>
        <hr className="bg-dark"></hr>
          <div>
            {error && <Alert variant="danger" className={"d-flex justify-content-center"}>{error}{emailVerification && <Button onClick={sendVerification} className={"btn-danger"}>Send Email Verification</Button>}</Alert>}
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
        {/*TODO: make this nicer. Both messages are in error mode, while the first should be success*/}
        <Button onClick={async ()=>{
          try {
            await sendPasswordResetEmail(auth, email);
            setError("Password reset mail was sent successfully. Please check your email")
          }catch(error){
            setError("Please enter your email first");
          }
        }} variant={"link"}>forgot password</Button>
          <button
            className="btn btn-danger m-2"
            onClick={onLogin}
          >
            Submit
          </button>
        </div>
    </>
  );
};

export default UserLog;
