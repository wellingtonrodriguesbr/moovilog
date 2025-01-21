import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { IRoute } from "@/interfaces/route";
import { RoutesRepository } from "@/repositories/routes-repository";

interface FetchCompanyRoutesUseCaseRequest {
	userId: string;
}

interface FetchCompanyRoutesUseCaseResponse {
	routes: IRoute[];
}

export class FetchCompanyRoutesUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository
	) {}

	async execute({
		userId,
	}: FetchCompanyRoutesUseCaseRequest): Promise<FetchCompanyRoutesUseCaseResponse> {
		const companyMember =
			await this.companyMembersRepository.findByUserId(userId);

		if (!companyMember) {
			throw new ResourceNotFoundError("Company member not found");
		}

		const routes = await this.routesRepository.findManyByCompanyId(
			companyMember.companyId
		);

		return { routes };
	}
}
