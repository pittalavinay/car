import React from 'react'
import { useState } from 'react';
import Cart from './Cart';
const Login = ({change}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
     console.log(credentials.email)
    try {
      const response = await fetch(`https://server-v3zf.onrender.com/login?email=${credentials.email}&password=${credentials.password}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
     
      const data = await response.json();
      if (data.authenticated) {
        console.log(data);
        change("cart");
      } else {
        console.error('Authentication failed');
        window.alert("no details please Register");
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };  
  return (
    <div className="background-component">
      <div className='nav'>
        <h3><b>IOT BASED SMART VEHICLE MONITORING SYSTEM</b></h3>
      </div>
      <div className='neat'>
      <form onSubmit={handleSubmit} >
        <ul className='fo'>
          <input
            className='input'
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            autoComplete={false}
            placeholder="Email"
          />
          <br /><br/>
          <input
            className='input'
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete={false}
            placeholder="Password"
          />
          <br /><br/>
          <button  className='sub' type='submit' onClick={handleSubmit}>Login</button>
        </ul>
        <br/>
      </form>
      <button className='reg' onClick={() => change("register")}>Register</button><br></br>
      </div>
    </div>
  )
}

export default Login
