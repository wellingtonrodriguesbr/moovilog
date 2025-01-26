import { CompaniesRepository } from "@/modules/company/repositories/companies-repository";
import { CompanyMembersRepository } from "@/modules/company-member/repositories/company-members-repository";
import { VehiclesRepository } from "@/modules/vehicle/repositories/vehicles-repository";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { IVehicle } from "@/modules/shared/interfaces/vehicle";

interface FetchVehiclesFromCompanyUseCaseRequest {
	companyId: string;
	userId: string;
}

interface FetchVehiclesFromCompanyUseCaseResponse {
	vehicles: IVehicle[];
}

export class FetchVehiclesFromCompanyUseCase {
	constructor(
		private vehiclesRepository: VehiclesRepository,
		private companyRepository: CompaniesRepository,
		private companyMemberRepository: CompanyMembersRepository
	) {}
	async execute({
		companyId,
		userId,
	}: FetchVehiclesFromCompanyUseCaseRequest): Promise<FetchVehiclesFromCompanyUseCaseResponse> {
		const [company, memberInCompany, vehicles] = await Promise.all([
			this.companyRepository.findById(companyId),
			this.companyMemberRepository.findMemberInCompany(userId, companyId),
			this.vehiclesRepository.findManyByCompanyId(companyId),
		]);

		if (!company) {
			throw new ResourceNotFoundError("Company not found");
		}

		if (!memberInCompany) {
			throw new ResourceNotFoundError("Member not found in company");
		}

		return { vehicles };
	}
}
