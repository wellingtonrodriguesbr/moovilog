import { prisma } from "@/lib/prisma";
import { Company } from "@prisma/client";
import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

interface RegisterCompanyUseCaseRequest {
  userId: string;
  name: string;
  documentNumber: string;
  type: "HEADQUARTERS" | "BRANCH" | "AGENCY";
  size: string;
}

interface RegisterCompanyUseCaseResponse {
  company: Company;
}

export async function registerCompanyUseCase({
  userId,
  name,
  documentNumber,
  type,
  size,
}: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
  const [user, companyAlreadyRegisteredWithThisDocument] = await Promise.all([
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    await prisma.company.findUnique({
      where: {
        documentNumber,
      },
    }),
  ]);

  if (user?.role !== "ADMIN") {
    throw new UnauthorizedError();
  }

  if (companyAlreadyRegisteredWithThisDocument) {
    throw new CompanyAlreadyExistsError();
  }

  const company = await prisma.company.create({
    data: {
      ownerId: userId,
      name,
      documentNumber,
      type,
      size,
      companyMembers: {
        create: {
          memberId: user.id,
          role: "ADMIN",
        },
      },
    },
  });

  return { company };
}
