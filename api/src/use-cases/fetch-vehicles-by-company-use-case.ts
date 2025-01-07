import { CompaniesRepository } from "@/repositories/companies-repository";
import { CompanyMembersRepository } from "@/repositories/company-members-repository";
import { VehiclesRepository } from "@/repositories/vehicles-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { IVehicle } from "@/interfaces/vehicle";

interface FetchVehiclesByCompanyUseCaseRequest {
	companyId: string;
	userId: string;
}

interface FetchVehiclesByCompanyUseCaseResponse {
	vehicles: IVehicle[];
}

export class FetchVehiclesByCompanyUseCase {
	constructor(
		private vehiclesRepository: VehiclesRepository,
		private companyRepository: CompaniesRepository,
		private companyMemberRepository: CompanyMembersRepository
	) {}
	async execute({
		companyId,
		userId,
	}: FetchVehiclesByCompanyUseCaseRequest): Promise<FetchVehiclesByCompanyUseCaseResponse> {
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
