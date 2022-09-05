import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


async function AdminloginUser(credentials) {
    return fetch('http://localhost:3001/AdminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function AdminLogin({ setAdmintoken }){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const errorAlert = () => {
    alert("نام کاربری یا رمز عبور را اشتباه وارد کردید");
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await AdminloginUser({
      username,
      password
    });
    setAdmintoken(result);
    setError(result.error)
    if(!result.error){
      navigate("/Admin")
    }else{
      errorAlert()
    }
    
  }


    return(
        <div className="login-wrapper">
        <h1>این صفحه مخصوص مدیر سایت میباشد</h1>
        <form>
            <label>
                <p>Username</p>
                <input className="ipnut-of-register"  type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input className="ipnut-of-register"  type="password" onChange={e => setPassword(e.target.value)}/>
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
        </div>
    );
}
