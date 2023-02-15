import jwtDecode from 'jwt-decode';

export const isAuthentication = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(token)
  } else {
    return false;
  }
}

const { data: { token } } = isAuthentication();
export const decodeUser = jwtDecode(token);