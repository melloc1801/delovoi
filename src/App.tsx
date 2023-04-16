import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AuthPage } from './pages/auth';
import { SearchTasksPage } from './pages/searchTasks';
import { MyTasksPage } from './pages/myTasks';
import { PublicRoute } from './router/PublicRoute';
import { PrivateRoute } from './router/PrivateRoute';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AuthContextProvider } from './modules/auth';

function App() {
  const ls = useLocalStorage();
  const [isAuth, setIsAuth] = React.useState<boolean>(
    Boolean(ls.getAuthToken())
  );
  const [token, setToken] = React.useState<string | null>(ls.getAuthToken());

  const setAuthHandle = (auth: boolean) => {
    setIsAuth(auth);
  };
  const setTokenHandle = (token: string | null) => {
    setToken(token);
  };

  return (
    <AuthContextProvider
      value={{
        auth: isAuth,
        token,
        setAuth: setAuthHandle,
        setToken: setTokenHandle,
      }}
    >
      <Routes>
        <Route path="/" element={<PrivateRoute auth={isAuth} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchTasksPage />} />
          <Route path="/mytasks" element={<MyTasksPage />} />
        </Route>
        <Route path="/" element={<PublicRoute auth={isAuth} />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
