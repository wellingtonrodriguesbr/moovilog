import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { ICity } from "@/modules/shared/interfaces/city";

interface FetchCitiesFromRouteUseCaseRequest {
	userId: string;
	routeId: string;
}

interface FetchCitiesFromRouteUseCaseResponse {
	cities: ICity[];
}

export class FetchCitiesFromRouteUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository,
		private citiesInRouteRepository: CitiesInRouteRepository,
		private citiesRepository: CitiesRepository
	) {}

	async execute({
		userId,
		routeId,
	}: FetchCitiesFromRouteUseCaseRequest): Promise<FetchCitiesFromRouteUseCaseResponse> {
		const [companyMember, route] = await Promise.all([
			this.companyMembersRepository.findByUserId(userId),
			this.routesRepository.findById(routeId),
		]);

		if (!companyMember) {
			throw new ResourceNotFoundError("Company member not found");
		}

		if (!route) {
			throw new ResourceNotFoundError("Route not found");
		}

		const citiesInRoute = await this.citiesInRouteRepository.findManyByRouteId(
			route.id
		);

		if (!citiesInRoute?.length) {
			throw new ResourceNotFoundError("No cities in route found");
		}

		const cities = await this.citiesRepository.findManyByIds(
			citiesInRoute.map((city) => city.cityId)
		);

		if (!cities?.length) {
			throw new ResourceNotFoundError("No cities found");
		}

		return { cities };
	}
}
