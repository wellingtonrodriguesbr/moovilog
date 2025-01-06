import { AuthLink, Prisma } from "@prisma/client";

export interface AuthLinksRepository {
	create(data: Prisma.AuthLinkUncheckedCreateInput): Promise<void>;
	findByCode(code: string): Promise<AuthLink | null>;
	deleteByUserId(userId: string): Promise<void>;
}
