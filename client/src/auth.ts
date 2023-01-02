import axios from 'axios';

export const authProvider = {
  isAuthenticated: false,
  token: '',
  async signIn(email: string, password: string, callback: VoidFunction) {
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      const data = await response.data;
      if (response.status === 200) {
        console.log(response);
        this.isAuthenticated = true;
        this.token = data.token;
        return callback();
      }
    } catch (error) {
      console.error(error);
      return alert(error.response.data.error);
    }
  },
  async signOut(callback: VoidFunction) {
    this.isAuthenticated = false;
    this.token = '';
  },
};

export interface AuthContextType {
  user: any;
  signIn: (email: string, password: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
