import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(to: string, subject: string, text: string) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	};

	await transporter.sendMail(mailOptions);
}
