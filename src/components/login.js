import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";


async function loginUser(credentials) {
    return fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({ setToken }){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const errorAlert = () => {
    alert("لطفا ابتدا ثبت نام کنید, اگر ثبت نام کرده اید و هنوز با ارور مواجه هستید احتمالا نام کاربری یا رمز عبور را درست وارد نکرده اید");
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await loginUser({
      username,
      password
    });
    setToken(result);
    setError(result.error)
    if(!result.error){
      navigate("/pay")
    }else{
      errorAlert()
    }
    
  }


    return(
        <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div className='btnLogin'>
                <a onClick={(e)=>handleSubmit(e)}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  ورود
                </a>
            </div>
        </form>
        <div className='btnLoginRegister'>
                <Link style={{ textDecoration: 'none' }} to="/register"><a>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  ثبت نام
                  </a></Link>
        </div>
        </div>
    );
}
