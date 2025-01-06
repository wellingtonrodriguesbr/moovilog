import { CompanyMember, Prisma } from "@prisma/client";
import { CompanyMembersRepository } from "../company-members-repository";
import { randomUUID } from "crypto";

export class InMemoryCompanyMembersRepository
	implements CompanyMembersRepository
{
	public items: CompanyMember[] = [];

	async create(data: Prisma.CompanyMemberUncheckedCreateInput) {
		const companyMember = {
			id: data.id ?? randomUUID(),
			companyId: data.companyId,
			userId: data.userId,
			role: data.role,
			status: data.status ?? "PENDING",
			sector: data.sector,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.items.push(companyMember);

		return companyMember;
	}

	async findById(id: string) {
		const member = this.items.find((item) => item.id === id);

		if (!member) return null;

		return member;
	}

	async findByUserId(userId: string) {
		const member = this.items.find((item) => item.userId === userId);

		if (!member) return null;

		return member;
	}

	async findMemberInCompany(userId: string, companyId: string) {
		const member = this.items.find(
			(item) => item.userId === userId && item.companyId === companyId
		);

		if (!member) return null;

		return member;
	}

	async findManyByCompanyId(companyId: string) {
		const members = this.items.filter((item) => item.companyId === companyId);

		return members;
	}

	async updateAccountStatus(id: string, status: "ACTIVE" | "INACTIVE") {
		const member = this.items.find((item) => item.id === id);

		if (!member) throw new Error("Member not found");

		member.status = status;
	}
}
