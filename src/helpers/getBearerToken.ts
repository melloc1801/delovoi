export const transformTokenIntoBearer = (token: string) => {
  return `Bearer ${token}`;
};
