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
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.role !== "ADMIN") {
    throw new UnauthorizedError();
  }

  const companyAlreadyRegisteredWithThisDocument =
    await prisma.company.findUnique({
      where: {
        documentNumber,
      },
    });

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
    },
  });

  return { company };
}
