export const getCookie = (cName: string) => {
  let cookie;
  const cookies = decodeURIComponent(document.cookie);
  const cookiesArr = cookies.split('; ');
  cookiesArr.map((val, index) => {
    // Add some logic eventually to check the validity of this cookie.
    if (val.indexOf(cName) === 0) {
      cookie = val.substring(6, val.length);
    }
  });

  return cookie;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};
