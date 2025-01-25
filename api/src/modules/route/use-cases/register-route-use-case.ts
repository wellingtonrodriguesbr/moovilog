import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { IRoute } from "@/modules/shared/interfaces/route";

interface RegisterRouteUseCaseRequest {
	name: string;
	citiesIds: string[];
	userId: string;
}

interface RegisterRouteUseCaseResponse {
	route: IRoute;
}

export class RegisterRouteUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository,
		private citiesInRouteRepository: CitiesInRouteRepository
	) {}

	async execute({
		name,
		citiesIds,
		userId,
	}: RegisterRouteUseCaseRequest): Promise<RegisterRouteUseCaseResponse> {
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
