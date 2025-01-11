import { Prisma } from "@prisma/client";
import { StatesRepository } from "../states-repository";
import { prisma } from "@/lib/prisma";

export class PrismaStatesRepository implements StatesRepository {
	async create(data: Prisma.StateUncheckedCreateInput) {
		const state = await prisma.state.create({
			data,
		});

		return state;
	}

	async findById(id: string) {
		const state = await prisma.state.findUnique({
			where: {
				id,
			},
		});

		if (!state) {
			return null;
		}

		return state;
	}

	async findByNameAndAcronym(name: string, acronym: string) {
		const state = await prisma.state.findUnique({
			where: {
				name,
				acronym,
			},
		});

		if (!state) {
			return null;
		}

		return state;
	}

	async findByAcronym(acronym: string) {
		const state = await prisma.state.findUnique({
			where: {
				acronym,
			},
		});

		return state;
	}
}
