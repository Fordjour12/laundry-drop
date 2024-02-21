import jwt from 'jsonwebtoken';

// const refreshToken = async (refreshToken: string) => {};

export const generateAccessToken = async (payload: string | object | Buffer) => {
	jwt.sign(payload, String(process.env.ACCESS_TOKEN), {
		expiresIn: '15m',
		audience: '',
		issuer: 'thedevelophantom097@laundry-services.com'
	});
};

export const generateRefreshToken = async (payload: string | object | Buffer): Promise<string> => {
	return jwt.sign(payload, String(process.env.REFRESH_TOKEN), {
		expiresIn: '7d',
		audience: '',
		issuer: 'thedevelophantom097@laundry-services.com'
	});
};
// const generateRefreshToken = async (user: company) => {};
// const generateAccessToken = async (user: company) => {};
