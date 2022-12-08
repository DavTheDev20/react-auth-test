import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [newUserData, setNewUserData] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = ({ target }: any) => {
    const { name, value } = target;

    switch (name) {
      case 'email':
        setNewUserData((prevValue) => {
          return {
            email: value,
            username: prevValue.username,
            password: prevValue.password,
            name: prevValue.name,
          };
        });
        break;
      case 'username':
        setNewUserData((prevValue) => {
          return {
            email: prevValue.email,
            username: value,
            password: prevValue.password,
            name: prevValue.name,
          };
        });
        break;
      case 'password':
        setNewUserData((prevValue) => {
          return {
            email: prevValue.email,
            username: prevValue.username,
            password: value,
            name: prevValue.name,
          };
        });
        break;
      case 'name':
        setNewUserData((prevValue) => {
          return {
            email: prevValue.email,
            username: prevValue.username,
            password: prevValue.password,
            name: value,
          };
        });
        break;
      default:
        console.error('Something went wrong...');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8080/api/register';

    if (
      !newUserData.email ||
      !newUserData.username ||
      !newUserData.password ||
      !newUserData.name
    ) {
      return alert('Please enter all information to register.');
    }

    axios({
      method: 'POST',
      url: apiUrl,
      data: newUserData,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.data);
        }
        // TODO: Determine why cookie is not setting in browser.
        return navigate('/');
      })
      .catch((err) => {
        console.log(err);
        return alert('Error: ' + err.response.data.error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form style={{ margin: '20px' }} onSubmit={handleSubmit}>
        <input
          name="email"
          type={'email'}
          placeholder={'enter your email...'}
          value={newUserData.email}
          onChange={handleChange}
        />
        <br />
        <input
          name="username"
          type={'text'}
          placeholder={'enter a username...'}
          value={newUserData.username}
          onChange={handleChange}
        />
        <br />
        <input
          name="name"
          type={'text'}
          placeholder={'enter your name...'}
          value={newUserData.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="password"
          type={'password'}
          placeholder={'enter a password...'}
          value={newUserData.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
