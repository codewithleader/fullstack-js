import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoutesLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return 'Cargando...';
  }

  return (
    <>
      <Header />
      {auth?.user?.id ? (
        <main className='container mx-auto mt-10'>
          <Outlet />
        </main>
      ) : (
        <Navigate to='/' />
      )}
      <Footer />
    </>
  );
};

export default ProtectedRoutesLayout;
