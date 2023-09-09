import { LaundryProvider, Prisma } from '@prisma/client'
import prismaClient from '../../helpers/prisma.helpers'

const createLaundryProvider = async (
	input: Prisma.LaundryProviderCreateInput
) =>
	(await prismaClient.laundryProvider.create({
		data: input,
	})) as LaundryProvider

const findLaundryProviderByEmail = async (
	where: Partial<Prisma.LaundryProviderWhereInput>,
	select?: Prisma.LaundryProviderSelect
) =>
	(await prismaClient.laundryProvider.findFirst({
		where,
		select,
	})) as LaundryProvider

export { createLaundryProvider, findLaundryProviderByEmail }
