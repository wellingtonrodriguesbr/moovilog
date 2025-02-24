import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { CitiesInRouteRepository } from "@/modules/route/repositories/cities-in-route-repository";
import { RoutesRepository } from "@/modules/route/repositories/routes-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { IRoute } from "@/modules/route/interfaces/route";
import { PermissionService } from "@/services/permission-service";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";

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
		private citiesInRouteRepository: CitiesInRouteRepository,
		private permissionService: PermissionService
	) {}

	async execute({
		name,
		citiesIds,
		userId,
	}: RegisterRouteUseCaseRequest): Promise<RegisterRouteUseCaseResponse> {
		if (!citiesIds || citiesIds.length === 0) {
			throw new BadRequestError("At least one city ID must be provided");
		}

		const member = await this.companyMembersRepository.findByUserId(userId);

		if (!member) {
			throw new ResourceNotFoundError("Company member not found");
		}

		const hasPermission = await this.permissionService.hasPermission(
			member.id,
			["ADMIN", "MANAGE_ROUTES"]
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

		const route = await this.routesRepository.create({
			name,
			creatorId: member.id,
			companyId: member.companyId,
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
