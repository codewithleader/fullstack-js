import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center'>
        {/* <Outlet /> es el espacio reservado donde se inyectará el contenido de las otras paginas que sean hijas de AuthLayout */}
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
