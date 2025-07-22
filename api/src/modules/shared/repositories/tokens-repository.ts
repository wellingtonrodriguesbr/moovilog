import { Token, Prisma } from "@prisma/client";

export interface TokensRepository {
  create(data: Prisma.TokenUncheckedCreateInput): Promise<void>;
  findByCode(code: string): Promise<Token | null>;
  deleteByUserId(userId: string): Promise<void>;
}
