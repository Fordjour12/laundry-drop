import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
  isRefreshTokenExpired,
} from "../../helper/jwt";
import prisma from "../../helper/prisma";

const signUpCompanyController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, password } = request.body;

  try {
    const findEmail = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    const bcryptSalt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    if (!findEmail) {
      const company = await prisma.company.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const accessToken = createAccessToken(
        {
          id: company.id,
          email: company.email,
          company_name: company.name,
        },
        company.id
      );

      const refreshToken = createRefreshToken(
        {
          id: company.id,
          email: company.email,
          company_name: company.name,
        },
        company.id
      );

      await prisma.cmpRefreshToken.create({
        data: {
          token: refreshToken,
          companyId: company.id,
        },
      });

      response
        .status(201)
        .header("Authorization", "Bearer " + accessToken)
        .json({
          status: "success",
          ...company,
        });
    } else {
      response.status(400).json({
        status: "error",
        message: "Company already exist Login instead",
      });
    }
  } catch (err) {
    next(err);
  }
};

const signInCompanyController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;

  try {
    const companyData = await prisma.company.findUnique({
      where: {
        email,
      },
      include: {
        cmpRefreshToken: true,
      },
    });

    if (!companyData) {
      return response.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      companyData.password
    );

    if (!isPasswordMatch) {
      return response.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // TODO: change to isRefreshTokenNotExpired (true) instead of current
    const val = isRefreshTokenExpired(companyData?.cmpRefreshToken[0].token);

    if (val === false) {
      const accessToken = createAccessToken(
        {
          id: companyData.id,
          email: companyData.email,
          company_name: companyData.name,
        },
        companyData.id
      );
      response
        .status(200)
        .header("Authorization", "Bearer " + accessToken)
        .json({
          status: "success",
        });
    } else {
      const accessToken = createAccessToken(
        {
          id: companyData.id,
          email: companyData.email,
          company_name: companyData.name,
        },
        companyData.id
      );

      const refreshToken = createRefreshToken(
        {
          id: companyData.id,
          email: companyData.email,
          company_name: companyData.name,
        },
        companyData.id
      );

      const updatedCmpToken = await prisma.cmpRefreshToken.updateMany({
        where: {
          companyId: companyData.id,
        },
        data: {
          token: refreshToken,
        },
      });

      response
        .status(200)
        .header("Authorization", "Bearer " + accessToken)
        .json({
          status: "success",
          ...companyData.cmpRefreshToken[0],
        });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { signInCompanyController, signUpCompanyController };
