import { Prisma } from "@prisma/client";

export interface AuthLinksRepository {
	create(data: Prisma.AuthLinkCreateInput): Promise<void>;
}
