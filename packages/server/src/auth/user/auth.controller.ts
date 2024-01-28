import { NextFunction, Request, Response } from "express";
import prisma from "../../helper/prisma";

const signUpUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const findByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findByEmail) {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
      res.status(201).json({
        status: "success",
        ...user,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Email already exist",
      });
    }
  } catch (error) {
    if (error) {
      console.error(error);
      next(error);
    }
  }
};

const signInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const findEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email not found",
      });
    }

    if (findEmail.password !== password) {
      return res.status(400).json({
        status: "error",
        message: "Password is wrong",
      });
    }

    res.status(200).json({
      status: "success",
      ...findEmail,
    });
  } catch (err) {
    next(err);
  }
};

export { signInUserController, signUpUserController };
