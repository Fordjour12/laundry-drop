import jwt from 'jsonwebtoken';

/**
 *  Generating an Access Token
 * 	@param payload - the payload to be signed
 * 	@returns a signed access token
 *
 * */
export const generateAccessToken = async (payload: string | object | Buffer): Promise<string> => {
	return jwt.sign(payload, String(process.env.ACCESS_TOKEN), {
		expiresIn: '15m',
		audience: '',
		issuer: 'thedevelophantom097@laundry-services.com'
	});
};

// question: what is the purpose of the audience and issuer in the jwt.sign method?
// answer: The audience and issuer are used to verify the token. The audience is the intended recipient of the token, and the issuer is the entity that issued the token. These are used to verify the token and ensure that it is valid.

/**
 * 	Generating a Refresh Token
 * 	@param payload - the payload to be signed
 * 	@returns a signed refresh token
 *
 * */
export const generateRefreshToken = async (payload: string | object | Buffer): Promise<string> => {
	return jwt.sign(payload, String(process.env.REFRESH_TOKEN), {
		expiresIn: '7d',
		audience: '',
		issuer: 'thedevelophantom097@laundry-services.com'
	});
};
// const generateRefreshToken = async (user: company) => {};
// const generateAccessToken = async (user: company) => {};
