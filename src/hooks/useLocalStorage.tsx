export const useLocalStorage = () => {
  return { getAuthToken, setAuthToken };
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};
