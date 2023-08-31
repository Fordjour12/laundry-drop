import { Prisma, User } from '@prisma/client'
import prismaClient from '../../helpers/prisma.helpers'

const createUserService = async (input: Prisma.UserCreateInput) =>
	(await prismaClient.user.create({ data: input })) as User

const findByEmail = async (
	where: Partial<Prisma.UserCreateInput>,
	select?: Prisma.UserSelect
) =>
	(await prismaClient.user.findFirst({
		where,
		select,
	})) as User

const findUniqueUser = async (
	where: Prisma.UserWhereUniqueInput,
	select: Prisma.UserSelect
) =>
	(await prismaClient.user.findUnique({
		where,
		select,
	})) as User

export { createUserService, findByEmail, findUniqueUser }
