import React, { useState } from 'react';

const Res = ({ change }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://server-v3zf.onrender.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
       console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message);

      // Clear the form after successful submission
      setFormData({
        username: '',
        email: '',
        password: ''
      });
     
      change("login")
    } catch (error) {
      console.error('Fetch error:', error);
      window.alert("already the details are persented");
    }
  };

  return (
    <div className='bareg'>
      <div className='neat'>
      <form onSubmit={handleSubmit}>
        <ul className='fo'>
          <input
            className='input'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <br />
          <input
            className='input'
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <br />
          <input
            className='input'
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <button type='submit' className='sub'>Submit</button>
        </ul>
      </form>
      
      </div>
    </div>
  );
};

export default Res;
