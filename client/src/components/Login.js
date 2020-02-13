import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(115deg, #080c12 , #172436);
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: steelblue;
  width: 400px;
  height: 400px;
  border-radius: 10px;
`

const Header = styled.h2`
  font-size: 32px;
  color: #edf2f7;
  letter-spacing: 3px;
`

const Label = styled.label`
  color: #edf2f7;
`

const Input = styled.input`
  font-size: 20px;
  width: 80%;
  background-color: lightsteelblue;
  border-color: #35547e;
  border-radius: 5px;
`

const Button = styled.button`
  color: lightsteelblue;
  font-size: 20px;
  background-color: #35547e;
  border: 2px solid #35547e;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: lightsteelblue;
    color: #35547e;
    font-weight: bold;

  }
`

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
    <FormContainer>
      <LoginForm onSubmit={login} >
        <Header>Login</Header>
        <Label>Username:</Label>
        <Input type='text' name='username' value={creds.username} onChange={handleChange} />
        <Label>Password:</Label>
        <Input type='password' name='password' value={creds.password} onChange={handleChange} />
        <Button>Log in</Button>
      </LoginForm>
    </FormContainer>
  );
};

export default Login;
