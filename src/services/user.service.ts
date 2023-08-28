import { Prisma, User } from '@prisma/client'
import prismaClient from '../helpers/prisma.helpers.js'

const CreateUserServices = async (emailAndPassword: Prisma.UserCreateInput) =>
	(await prismaClient.user.create({
		data: emailAndPassword,
	})) as User

const FindUserByEmail = async (
	where: Prisma.UserWhereInput,
	select?: Prisma.UserSelect
) =>
	(await prismaClient.user.findFirst({
		where,
		select,
	})) as User

export { CreateUserServices, FindUserByEmail }
