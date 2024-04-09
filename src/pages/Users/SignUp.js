import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navigation from "./../../compoments/Navigation/Navigation";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <>
      <Navigation />
      <div className='container'>
        <h4 className='display-4 m-3 p-1'>Create Account</h4>
        <form>
          <div>
            <label className="form-label">Email address</label>
            <input
              type='email'
              className='form-control m-2'
              placeholder='e-mail'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Set Password</label>
            <input
              type='password'
              className='form-control m-2'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='btn btn-danger m-2'
            onClick={onsubmit}
          >
            Submit
          </button>
        </form>
        <p className='lead'>
          Already have an account?{' '}
          <NavLink to="/log_in">Sign in</NavLink>
        </p>
      </div>
    </>
  );
}

export default SignUp;
