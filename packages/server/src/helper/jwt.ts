import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET || "secret";
const refreshTokenSecret = process.env.RF_JWT_SECRET || "refreshSecret";

const accessSignToken = (
  payload: string | object | Buffer,
  expiresIn: string,
  userId: number
) => {
  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: expiresIn,
    issuer: "develophantom@laundrydrop.in",
    audience: String(userId),
  });
};

const refreshSignToken = (
  payload: string | object | Buffer,
  expiresIn: string,
  userId: number
) => {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: expiresIn,
    issuer: "develophantom@laundrydrop.in",
    audience: String(userId),
  });
};

/**
 * Creating an access token
 * @param payload - data to be stored in the token
 * @param usrId - user id
 * @returns access token (type: string)
 *
 * */
const createAccessToken = (
  payload: string | object | Buffer,
  usrId: number
) => {
  return accessSignToken(payload, "15m", usrId);
};

/**
 * Creating a refresh token
 * @param payload - data to be stored in the token
 * @param usrId - user id
 * @returns refresh token (type: string)
 *
 * */
const createRefreshToken = (
  payload: string | object | Buffer,
  usrId: number
) => {
  return refreshSignToken(payload, "7d", usrId);
};

/**
 * Check if refresh token has expired
 * @param token - refresh token
 * @returns boolean
 *
 * */
function isRefreshTokenExpired(token: string): boolean {
  try {
    jwt.verify(token, refreshTokenSecret);
    return false; // Token is valid, not expired
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return true; // Token has expired
    } else {
      return false; // Token is invalid, but not because it's expired
    }
  }
}

function isAccessTokenExpired(token: string): boolean {
  try {
    jwt.verify(token, accessTokenSecret);
    return false; // Token is valid, not expired
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return true; // Token has expired
    } else {
      return false; // Token is invalid, but not because it's expired
    }
  }
}

export {
  createAccessToken,
  createRefreshToken,
  isRefreshTokenExpired,
};
