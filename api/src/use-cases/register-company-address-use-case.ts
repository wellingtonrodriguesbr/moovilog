import { prisma } from "@/lib/prisma";
import { Address } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterCompanyAddressUseCaseRequest {
  cityName: string;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string | null;
  zipCode: string;
  userId: string;
}

interface RegisterCompanyAddressUseCaseResponse {
  address: Address;
}

export async function registerCompanyAddressUseCase({
  cityName,
  street,
  neighborhood,
  number,
  zipCode,
  complement,
  userId,
}: RegisterCompanyAddressUseCaseRequest): Promise<RegisterCompanyAddressUseCaseResponse> {
  const [city, company] = await Promise.all([
    prisma.city.findFirst({
      where: {
        name: cityName,
      },
    }),
    await prisma.company.findUnique({
      where: {
        ownerId: userId,
      },
    }),
  ]);

  if (!city) {
    throw new ResourceNotFoundError("City not found");
  }

  if (!company) {
    throw new ResourceNotFoundError("Company not found");
  }

  const address = await prisma.address.create({
    data: {
      street,
      number: Number(number),
      neighborhood,
      zipCode,
      complement,
      cityId: city.id,
      companyAddress: {
        create: {
          companyId: company.id,
        },
      },
    },
  });

  return { address };
}
