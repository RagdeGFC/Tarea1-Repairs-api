import authRoutes from './auth.routes';

export const AppRoutes = {
	routes: [{ path: '/api/auth', router: authRoutes }],
};
