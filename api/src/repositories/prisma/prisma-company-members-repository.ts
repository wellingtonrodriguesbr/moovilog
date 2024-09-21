import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyMembersRepository } from "../company-members-repository";

export class PrismaCompanyMembersRepository implements CompanyMembersRepository {
	async create(data: Prisma.CompanyMemberUncheckedCreateInput) {
		const companyMember = await prisma.companyMember.create({
			data,
		});

		return companyMember;
	}

	async findById(id: string) {
		const member = await prisma.companyMember.findUnique({
			where: {
				id,
			},
		});

		if (!member) {
			return null;
		}

		return member;
	}

	async findByMemberId(memberId: string) {
		const member = await prisma.companyMember.findFirst({
			where: {
				memberId,
			},
		});

		if (!member) {
			return null;
		}

		return member;
	}

	async findMemberInCompany(memberId: string, companyId: string) {
		const companyMember = await prisma.companyMember.findUnique({
			where: {
				companyId_memberId: {
					companyId,
					memberId,
				},
			},
		});

		if (!companyMember) {
			return null;
		}

		return companyMember;
	}

	async findManyByCompanyId(companyId: string) {
		const companyMembers = await prisma.companyMember.findMany({
			where: {
				companyId,
			},
			include: {
				member: {
					select: {
						name: true,
						email: true,
						createdAt: true,
						updatedAt: true,
					},
				},
			},
		});

		return companyMembers;
	}
}
