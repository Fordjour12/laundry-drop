import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// must be an RSA265 key
const PvSecret = String(process.env.JWT_TOKEN_PRIVATE_KEY)
const PbSecret = String(process.env.JWT_TOKEN_PUBLIC_KEY)

const signJWT = (payload: object, expiresIn: string | number) => {
	const signedValue = jwt.sign(
		payload,
		PvSecret,
		{
			algorithm: 'RS256',
			expiresIn,
			issuer: 'LaundryDrop.io',
		},
		(error) => {
			if (error) {
				const err = error
				throw err
			}
		}
	)
	console.info(signedValue)

	return signedValue
}

const verifyJWT = (token: string) => {
	try {
		const decodedToken = jwt.verify(token, PbSecret)
		return { payload: decodedToken, expired: false }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return {
			payload: null,
			expired: error.message.include('TOKEN expired'),
		}
	}
}

export { signJWT, verifyJWT }
