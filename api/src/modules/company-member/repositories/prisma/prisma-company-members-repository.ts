import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";

export class PrismaCompanyMembersRepository
	implements CompanyMembersRepository
{
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

	async findByUserId(userId: string) {
		const member = await prisma.companyMember.findFirst({
			where: {
				userId,
			},
		});

		if (!member) {
			return null;
		}

		return member;
	}

	async findMemberInCompany(userId: string, companyId: string) {
		const companyMember = await prisma.companyMember.findUnique({
			where: {
				companyId_userId: {
					companyId,
					userId,
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
				user: {
					select: {
						name: true,
						email: true,
						phone: true,
						createdAt: true,
						updatedAt: true,
					},
				},
			},
		});

		return companyMembers;
	}

	async updateAccountStatus(id: string, status: "ACTIVE" | "INACTIVE") {
		await prisma.companyMember.update({
			where: {
				id,
			},
			data: {
				status,
			},
		});
	}
}
