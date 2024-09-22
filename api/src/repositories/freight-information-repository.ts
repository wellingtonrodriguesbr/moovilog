import { FreightInformation, Prisma } from "@prisma/client";

export interface FreightInformationRepository {
	create(
		data: Prisma.FreightInformationUncheckedCreateInput
	): Promise<FreightInformation>;
	findByFreight(freightId: string): Promise<FreightInformation | null>;
}
