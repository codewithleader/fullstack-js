// ----------------------------------------------------------------------

function path(root = '', sublink = '') {
  return `${root}${sublink}`;
}

const ROOTS_API = '/api';

// ----------------------------------------------------------------------

export const PATH_VETERINARIAN = {
  root: path(ROOTS_API, '/veterinarios'),
  veterinarians: {
    root: '/',
    profile: '/perfil',
    update_profile: '/perfil/:id',
    verify: '/confirmar/:token', // Dynamic QueryParam
    login: '/login',
    reset_password: '/reset-password',
    new_password: '/new-password/:token', // Dynamic QueryParam
    change_password: '/change-password'
  },
};

export const PATH_PATIENTS = {
  root: path(ROOTS_API, '/pacientes'),
  patients: {
    root: '/',
    patient: '/:id', // Dynamic QueryParam
  },
};
