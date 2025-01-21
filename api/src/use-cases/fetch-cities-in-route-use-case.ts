import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { RoutesRepository } from "@/repositories/routes-repository";
import { CitiesInRouteRepository } from "@/repositories/cities-in-route-repository";
import { ICity } from "@/interfaces/city";
import { CitiesRepository } from "@/repositories/cities-repository";

interface FetchCitiesInRouteUseCaseRequest {
	userId: string;
	routeId: string;
}

interface FetchCitiesInRouteUseCaseResponse {
	cities: ICity[];
}

export class FetchCitiesInRouteUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository,
		private citiesInRouteRepository: CitiesInRouteRepository,
		private citiesRepository: CitiesRepository
	) {}

	async execute({
		userId,
		routeId,
	}: FetchCitiesInRouteUseCaseRequest): Promise<FetchCitiesInRouteUseCaseResponse> {
		const companyMember =
			await this.companyMembersRepository.findByUserId(userId);

		if (!companyMember) {
			throw new ResourceNotFoundError("Company member not found");
		}

		const route = await this.routesRepository.findById(routeId);

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
