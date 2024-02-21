import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
	return bcrypt.hash(password, salt);
};
