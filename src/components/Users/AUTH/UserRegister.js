import React , {useState} from 'react'
import { useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {auth} from './../../../firebase';
import UserNav from '../UserNav';

const UserRegister = ()=> {
    const navigate = useNavigate();

    const [email , SetEmail ] = useState('');
    const [password , SetPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth , email , password)
        .then((userCredential)=>{
            const user = userCredential.user;
            sendEmailVerification(user);
            console.log(user);
            navigate("/log_in")

        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode , errorMessage);
        })
    }
    return(
        <>
        <UserNav />
        <div className='container'>
        <h4 className='display-4 m-3 p-1'>Create Account</h4>
            <div>
                <label  className="form-label">Email address</label>
                <input
                type='email'
                className='form-control m-2'
                placeholder='e-mail'
                value={email}
                required
                onChange={(e) => SetEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <label  className="form-label">Set Password</label>
                <input type='password'
                 className='form-control m-2'
                  placeholder='password'
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  required
                  ></input>
            </div>
              <button
                  className='btn btn-danger m-2'
                  onClick={onSubmit}
               >Submit
              </button>
        </div>

        </>
    )
}
export default UserRegister