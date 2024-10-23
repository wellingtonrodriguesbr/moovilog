import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { IUser } from "@/interfaces/user";
import { ICompanyMember } from "@/interfaces/company-member";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";

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
			throw new ResourceNotFoundError("User profile not found");
		}

		const companyMember = await this.companyMembersRepository.findByUserId(
			user.id
		);

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
