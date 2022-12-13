import axios from 'axios';
import { useState, FormEvent } from 'react';
import { storeToken } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }: any) => {
    const { name, value } = target;

    if (name === 'email') {
      setUserLogin((prevVal) => {
        return {
          email: value,
          password: prevVal.password,
        };
      });
    } else if (name === 'password') {
      setUserLogin((prevVal) => {
        return {
          email: prevVal.email,
          password: value,
        };
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/login',
      data: userLogin,
    })
      .then((res) => {
        if (res.status > 299) {
          console.log(res.data);
          return alert(res.data.error);
        }
        const token = res.data.token;
        storeToken(token);
        navigate('/');
        return window.location.reload();
      })
      .catch((err) => {
        return alert(err.response.data.error);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type={'email'}
          placeholder={'enter email...'}
          name="email"
          value={userLogin.email}
          onChange={handleChange}
        />
        <br />
        <input
          type={'password'}
          placeholder={'enter password...'}
          name="password"
          value={userLogin.password}
          onChange={handleChange}
        />
        <br />
        <button type={'submit'}>SUBMIT</button>
      </form>
    </div>
  );
};

export default Login;
