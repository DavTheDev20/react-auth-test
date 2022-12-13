import { getCookie } from './utils/cookieUtils';

export const storeToken = (token: any) => {
  try {
    document.cookie = `token=${token}; expires=session`;
  } catch (err) {
    return console.log(err);
  }
};

export const checkAuth = (): boolean => {
  let res = false;
  const token = getCookie('token');
  // Add API to verifiy token's validity.
  if (token) return true;

  return false;
};

export const AuthenticatedRoute = ({ children }: any) => {
  const authenticated = checkAuth();
  if (authenticated === true) return children;

  return 'Not authenticated';
};
