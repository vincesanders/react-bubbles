import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
  const [creds, setCreds] = useState({
      username: '',
      password: ''
  });

  const login = e => {
    e.preventDefault();
    axios
        .post('http://localhost:5000/api/login', creds)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            history.push('/protected');
        })
        .catch(err => console.log(err));
  }

  const handleChange = e => {
    setCreds({
        ...creds,
        [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={login} >
        <input type='text' name='username' value={creds.username} onChange={handleChange} />
        <input type='password' name='password' value={creds.password} onChange={handleChange} />
        <button>Log in</button>
    </form>
  );
};

export default Login;
