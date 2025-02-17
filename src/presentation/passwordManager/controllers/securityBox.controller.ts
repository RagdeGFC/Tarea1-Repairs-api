import { Request, Response } from 'express';
import { SecurityBoxService } from '../services/securityBox.service';

export class SecurityBoxController {
	//
	static async createSecurityBox(req: Request, res: Response) {
		try {
			const userId = req.user.id;
			const { name, favorite, icon } = req.body;
			const securityBox = await SecurityBoxService.createSecurityBox(
				userId,
				name,
				favorite,
				icon,
			);
			return res.status(201).json(securityBox);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	//
	static async getSecurityBoxes(req: Request, res: Response) {
		try {
			const userId = req.user.id;
			const securityBoxes = await SecurityBoxService.getSecurityBoxes(userId);
			return res.status(200).json(securityBoxes);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	// Endpoint #3 Listar Categorías

	static async getCategories(req: Request, res: Response) {
		try {
			console.log('📌 SecurityBoxController.getCategories fue llamado'); //bandera
			const { sort } = req.query;
			const categories = await SecurityBoxService.getCategories(sort as string);
			console.log('📌 Categorías enviadas en la respuesta:', categories); // 🚀 Bandera de salida
			res.json(categories);
		} catch (error: any) {
			console.error('❌ ERROR en getCategories:', error); //bandera
			res.status(500).json({ message: 'Error al obtener las categorías' });
		}
	}
	// Endpoint #4: Ver detalle de un baúl de contraseñas
	static async getSecurityBoxById(req: Request, res: Response) {
		try {
			const { securityBoxId } = req.params;

			console.log(`📌 Recibida petición para SecurityBox ID: ${securityBoxId}`); // 🚀 Bandera

			const securityBox = await SecurityBoxService.getSecurityBoxById(
				securityBoxId,
			);

			return res.status(200).json(securityBox);
		} catch (error: any) {
			console.error(
				`❌ ERROR en SecurityBoxController.getSecurityBoxById:`,
				error,
			);
			return res.status(404).json({ message: error.message });
		}
	}
}
