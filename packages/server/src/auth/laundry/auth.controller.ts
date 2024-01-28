import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { createAccessToken, createRefreshToken } from "../../helper/jwt";
import prisma from "../../helper/prisma";

const signUpCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const findEmail = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    const bcryptSalt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    if (!findEmail) {
      const user = await prisma.company.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const accessToken = createAccessToken(
        {
          id: user.id,
          email: user.email,
          company_name: user.name,
        },
        user.id
      );

      const refreshToken = createRefreshToken(
        {
          id: user.id,
          email: user.email,
          company_name: user.name,
        },
        user.id
      );

      res.status(201).json({
        status: "success",
        ...user,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Company already exist Login instead",
      });
    }
  } catch (err) {
    next(err);
  }
};

const signInCompanyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const companyData = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (!companyData) {
      return res.status(400).json({
        status: "error",
        message: "Email not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      companyData.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        message: "Wrong password",
      });
    } else {
      res.status(200).json({
        status: "success",
        ...companyData,
      });
    }
  } catch (error) {
    if (error) {
      console.error(error);
      next(error);
    }
  }
};
export { signInCompanyController, signUpCompanyController };
