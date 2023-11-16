import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuth({});
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const {
          data: { user },
        } = await clientAxios('/veterinarios/perfil', config);

        setAuth(user); // 'user' será ahora 'auth' en el context
      } catch (error) {
        console.error(error.response.data.msg);
        setAuth({});
      }

      setLoading(false);
    };

    authenticateUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
