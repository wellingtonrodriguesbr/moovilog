import { prisma } from "@/lib/prisma";
import { Company } from "@prisma/client";
import { CompanyAlreadyExistsError } from "./errors/company-already-exists-error";

interface RegisterCompanyUseCaseRequest {
  userId: string;
  documentNumber: string;
  type: "HEADQUARTERS" | "BRANCH" | "AGENCY";
  size: string;
}

interface RegisterCompanyUseCaseResponse {
  company: Company;
}

export async function registerCompanyUseCase({
  userId,
  documentNumber,
  type,
  size,
}: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {
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
      documentNumber,
      type,
      size,
    },
  });

  return { company };
}
