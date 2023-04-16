export const useLocalStorage = () => {
  return { getAuthToken, setAuthToken };
};

const getAuthToken = () => {
  localStorage.getItem('authToken');
};

const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};
