import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import './SignUp.css'


const SignUp = () => {

    const navigate = useNavigate();
    const {createUser} = useContext(AuthContext);
    const [error, setError] =useState(null);
    const handleSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        if(password.length < 6){
            setError(`Your Password must be 6 character`);
            return;
        }
        if(password !== confirm){
            setError(`Your password didn't match`);
            return;
        }

        createUser(email, password)
        .then((result)=>{
            const user = result.user;
            console.log(user);
            form.reset();
            navigate('/');
        })
        .catch((error)=>{
            console.error("Error: ", error);
        })
    }
  return (
    <div className='form-container'>
        <h2 className='form-title'>Registration Panel</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" required />
            </div>
            <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" required />
            </div>
            <div className='form-control'>
                <label htmlFor='confirm'>Confirm Password</label>
                <input type="password" name="confirm" required />
            </div>
            <input className='btn-submit' type='submit' value="Registration" />
            <p>Already have an account? <Link to='/login'> Login </Link></p>
            <p className='text-error'><b>{error}</b></p>
        </form>
    </div>
  )
}

export default SignUp