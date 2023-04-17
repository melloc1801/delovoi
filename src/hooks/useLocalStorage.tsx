export const useLocalStorage = () => {
  return { getAuthToken, setAuthToken, removeToken };
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};
