import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Navigation from "../../compoments/Navigation/Navigation";
import { auth } from "../../firebase";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword , setShowPassword] = useState(false);

  const onsubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8){
      alert("Password should be at least 8 characters")
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate("/User");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  const TogglePasswordVisibility = ()=> {
    setShowPassword(prevState => !prevState);  }

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
              type={showPassword ? 'text' : 'password'}
              className='form-control m-2'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
            type="button"
            className="btn btn-outline-secondary m-2"
            onClick={TogglePasswordVisibility}
            
            >
            {showPassword ? "Hide Password" : "Show Password"}
            </button>

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

export default CreateAccount;
