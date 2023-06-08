export const isAuthentication = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(token ? token : "")
  }
}