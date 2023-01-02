export const setCookie = (cookieName: string, cookieVal: string) => {
  return (document.cookie = `${cookieName}=${cookieVal}; expires=session`);
};

export const getCookie = (cookieName: string) => {
  return document.cookie.split(';').some((cookie) => {
    return cookie.trim().startsWith(cookieName + '=');
  });
};

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; Max-Age=0`;
};
