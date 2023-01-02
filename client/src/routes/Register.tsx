import React from 'react';
import { authProvder } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const register = (event: React.FormEvent) => {
    event.preventDefault();

    const { target }: any = event;

    const name = target.name.value;
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirm = target.passwordConfirm.value;

    if (password !== passwordConfirm)
      return alert('Passwords do not match, please re-enter.');

    authProvder.register({ name, username, email, password }, () => {
      console.log('Registered.');
      navigate('/', { replace: true });
      window.location.reload();
    });
  };

  return (
    <div id="Register">
      <h1>Register</h1>
      <form onSubmit={register}>
        <input type={'text'} placeholder="name" name="name" />
        <br />
        <input type={'text'} placeholder="username" name="username" />
        <br />
        <input type={'email'} placeholder="email" name="email" />
        <br />
        <input type={'password'} placeholder="password" name="password" />
        <br />
        <input
          type={'password'}
          placeholder="confirm password"
          name="passwordConfirm"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
