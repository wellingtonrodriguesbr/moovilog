import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { UsersRepository } from "@/modules/user/repositories/users-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { IUser } from "@/modules/user/interfaces/user";
import { ICompanyMember } from "@/modules/company-member/interfaces/company-member";

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: Omit<IUser, "password"> & { companyMember: ICompanyMember | null };
}

export class GetUserProfileUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private companyMembersRepository: CompanyMembersRepository
	) {}
	async execute({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFoundError("User not found");
		}

		const companyMember = await this.companyMembersRepository.findByUserId(
			user.id
		);

		if (!companyMember) {
			throw new ResourceNotFoundError("Company member not found");
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user;

		return {
			user: {
				...userWithoutPassword,
				companyMember,
			},
		};
	}
}
