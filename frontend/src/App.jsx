import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoutesLayout from './layouts/ProtectedRoutesLayout';
import { AuthProvider } from './context/AuthProvider';
import Register from './pages/Register';
import VerifyAccount from './pages/VerifyAccount';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Login from './pages/login';
import AdminPatients from './pages/AdminPatients';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            {/* Rutas Públicas */}
            <Route index element={<Login />} />
            {/* Las demas rutas no hay que agregarles el slash '/' ya que se unen al padre. 'registrar' quedaría '/registrar' y asi las demás  */}
            <Route path='registrar' element={<Register />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='new-password/:token' element={<NewPassword />} />
            <Route path='confirmar/:token' element={<VerifyAccount />} />
          </Route>

          {/* Rutas Privadas */}
          <Route path='/admin' element={<ProtectedRoutesLayout />}>
            <Route index element={<AdminPatients />} />
            {/* <Route path='/otraruta' element={} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
