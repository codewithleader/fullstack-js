// ----------------------------------------------------------------------

function path(root = '', sublink = '') {
  return `${root}${sublink}`;
}

const ROOTS_API = '/api';

// ----------------------------------------------------------------------

export const PATH_API = {
  root: ROOTS_API,
  veterinarians: {
    root: path(ROOTS_API, '/veterinarios'),
    profile: '/perfil',
    verify: '/confirmar/:token', // Dynamic QueryParam
  },
};
