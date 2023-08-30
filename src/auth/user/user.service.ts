import { Prisma, User } from '@prisma/client'
import prismaClient from '../../helpers/prisma.helpers.js'

const createUserServices = async (input: Prisma.UserCreateInput) =>
	(await prismaClient.user.create({
		data: input,
	})) as User
    
