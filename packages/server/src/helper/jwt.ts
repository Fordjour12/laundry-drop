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

const createAccessToken = (
  payload: string | object | Buffer,
  usrId: number
) => {
  return accessSignToken(payload, "15m", usrId);
};

const createRefreshToken = (
  payload: string | object | Buffer,
  usrId: number
) => {
  return refreshSignToken(payload, "7d", usrId);
};

export { createAccessToken, createRefreshToken };

// const verify = (token: string) => {
//   return jwt.verify(token, secret);
// };

// const decode = (token: string) => {
//   return jwt.decode(token);
// };
