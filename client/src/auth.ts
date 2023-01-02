import axios from 'axios';

export const useAuth = (): boolean => {
  const user = localStorage.getItem('user');
  if (user) return true;

  return false;
};

export const authProvder = {
  async login(email: string, password: string, callback: VoidFunction) {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      const data = await response.data;

      if (response.status === 200) {
        console.log('Login successsful.');
        const userToken = data.token;
        localStorage.setItem('user', userToken);
        return callback();
      }
    } catch (error: any) {
      console.error(error);
      return alert(error.response.data.error);
    }
  },
  logout(callback: VoidFunction) {
    localStorage.removeItem('user');
    callback();
  },
  async register(
    userData: {
      email: string;
      username: string;
      password: string;
      name: string;
    },
    callback: VoidFunction
  ) {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/register',
        userData
      );
      const data = await response.data;
      if (response.status === 200) {
        console.log('Successfuly registered...');
        const userToken = data.token;
        localStorage.setItem('user', userToken);
        return callback();
      }
    } catch (error: any) {
      console.error(error);
      return alert(error.response.data.error);
    }
  },
};
