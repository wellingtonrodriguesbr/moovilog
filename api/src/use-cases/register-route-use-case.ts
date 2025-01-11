import { IRoute } from "@/interfaces/route";
import { CitiesInRouteRepository } from "@/repositories/cities-in-route-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { RoutesRepository } from "@/repositories/routes-repository";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { BadRequestError } from "@/use-cases/errors/bad-request-error";

interface RegisterRoutesUseCaseRequest {
	name: string;
	citiesIds: string[];
	userId: string;
}

interface RegisterRoutesUseCaseResponse {
	route: IRoute;
}

export class RegisterRoutesUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository,
		private citiesInRouteRepository: CitiesInRouteRepository
	) {}

	async execute({
		name,
		citiesIds,
		userId,
	}: RegisterRoutesUseCaseRequest): Promise<RegisterRoutesUseCaseResponse> {
		if (!citiesIds || citiesIds.length === 0) {
			throw new BadRequestError("At least one city ID must be provided");
		}

		const companyMember =
			await this.companyMembersRepository.findByUserId(userId);

		if (!companyMember) {
			throw new ResourceNotFoundError("Company member not found");
		}

		const routeAlreadyExistsWithSameNameInCompany =
			await this.routesRepository.findRouteInCompanyWithSameName(
				name,
				companyMember.companyId
			);

		if (routeAlreadyExistsWithSameNameInCompany) {
			throw new BadRequestError(
				"Route already exists with same name in company"
			);
		}

		const route = await this.routesRepository.create({
			name,
			creatorId: companyMember.id,
			companyId: companyMember.companyId,
		});

		await Promise.all(
			citiesIds.map((cityId) =>
				this.citiesInRouteRepository.create({
					routeId: route.id,
					cityId,
				})
			)
		);

		return { route };
	}
}
