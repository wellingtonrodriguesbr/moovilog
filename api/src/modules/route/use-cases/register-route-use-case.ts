import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { IRoute } from "@/modules/route/interfaces/route";
import { PermissionService } from "@/services/permission-service";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";

interface RegisterRouteUseCaseRequest {
	name: string;
	stateAcronym: string;
	cityNames: string[];
	userId: string;
}

interface RegisterRouteUseCaseResponse {
	route: IRoute;
}

export class RegisterRouteUseCase {
	constructor(
		private companyMembersRepository: CompanyMembersRepository,
		private routesRepository: RoutesRepository,
		private citiesRepository: CitiesRepository,
		private statesRepository: StatesRepository,
		private citiesInRouteRepository: CitiesInRouteRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		name,
		stateAcronym,
		cityNames,
		userId,
	}: RegisterRouteUseCaseRequest): Promise<RegisterRouteUseCaseResponse> {
		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Company member not found");
		}

		const hasPermission = await this.permissionService.hasPermission(
			member.id,
			["SUPER_ADMIN", "ADMIN", "MANAGE_ROUTES"]
		);

		if (!hasPermission) {
			throw new NotAllowedError(
				"You do not have permission to perform this action"
			);
		}

		const routeAlreadyExistsWithSameNameInCompany =
			await this.routesRepository.findRouteInCompanyWithSameName(
				name,
				member.companyId
			);

		if (routeAlreadyExistsWithSameNameInCompany) {
			throw new BadRequestError(
				"Route already exists with same name in company"
			);
		}

		const state = await this.statesRepository.findByAcronym(stateAcronym);

		if (!state) {
			throw new ResourceNotFoundError("State not found");
		}

		const cities = await this.citiesRepository.findOrCreateManyByStateId(
			cityNames,
			state.id
		);

		const route = await this.routesRepository.create({
			name,
			creatorId: member.id,
			companyId: member.companyId,
		});

		await Promise.all(
			cities.map((city) =>
				this.citiesInRouteRepository.create({
					routeId: route.id,
					cityId: city.id,
				})
			)
		);

		return { route };
	}
}
