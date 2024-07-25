import {  getCookie  } from 'cookies-next';

const getTokenFromCookie = () => {
  let token;

    token = getCookie('token1');
    
  return token;
};

export { getTokenFromCookie };
