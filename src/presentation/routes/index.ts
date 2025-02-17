import { Router } from 'express';
import userRoutes from '../passwordManager/routes/user.routes'; //
import securityBoxRoutes from '../passwordManager/routes/securityBox.routes'; // Endpoint #3 Listar Categorías
import pinRoutes from '../passwordManager/routes/pin.routes'; // 🔹 Importamos la nueva ruta
import passwordRoutes from '../passwordManager/routes/password.routes';
import authRoutes from './auth.routes';

//bandera
console.log('📌 securityBoxRoutes en index.ts:', securityBoxRoutes);
console.log('📌 Verificando importación de securityBoxRoutes en index.ts...');
console.log('🔍 securityBoxRoutes:', securityBoxRoutes); // 🔍 Verifica si es `undefined`

//bandera
if (!securityBoxRoutes)
	console.error('❌ ERROR: securityBoxRoutes no está definido.');
else console.log('✅ securityBoxRoutes cargado correctamente.');

const router = Router();

// Registrar rutas correctamente
router.use('/api/auth', authRoutes); // Endpoint #1 login de usuario
router.use('/api/user', userRoutes); //Endpoin #2 Crear usuario
router.use('/api/security_box', securityBoxRoutes); //  Endpoint #3 Listar Categorías
router.use('/api/pin', pinRoutes); // Endpoint #5 validar pin
router.use('/api/password', passwordRoutes); // Endpoint #7 generar contraseña aleatoria

//bandera
console.log('📌 Rutas registradas en Express después de securityBoxRoutes:');
router.stack.forEach((r) =>
	console.log(r.route?.path || 'Middleware sin ruta'),
);

//bandera
console.log('📌 securityBoxRoutes en index.ts:', typeof securityBoxRoutes);
console.log('📌 securityBoxRoutes contiene:', securityBoxRoutes);

//bandera
console.log('📌 Verificando rutas registradas en Express:');
router.stack.forEach((r) =>
	console.log(r.route?.path || 'Middleware sin ruta'),
);

// bandera IMPRIMIR TODAS LAS RUTAS REGISTRADAS
console.log('📌 Verificando rutas registradas en Express...');
router.stack.forEach((r) =>
	console.log('🔍 Ruta registrada:', r.route?.path || 'Middleware sin ruta'),
);

// bandera FORZAR QUE EXPRESS REGISTRE LA RUTA CORRECTAMENTE
const testRoute = '/api/security_box/categories';
if (!router.stack.some((r) => r.route?.path === testRoute)) {
	console.error(`❌ ERROR: La ruta ${testRoute} no está registrada.`);
} else {
	console.log(`✅ La ruta ${testRoute} está correctamente registrada.`);
}

// Exportar el router
export default router;
