import { FastifyReply, FastifyRequest } from "fastify";
import { CompanyAlreadyExistsError } from "@/use-cases/errors/company-already-exists-error";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";
import { makeRegisterCompanyAddressUseCase } from "@/use-cases/factories/make-register-company-address-use-case";

import z from "zod";

export async function registerCompanyAddressController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyAddressBodySchema = z.object({
    cityName: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    number: z.number(),
    complement: z.string().optional().nullable(),
    zipCode: z.string(),
  });

  const { cityName, street, neighborhood, number, complement, zipCode } =
    registerCompanyAddressBodySchema.parse(req.body);

  const userId = req.user.sub;

  try {
    const registerCompanyAddressUseCase = makeRegisterCompanyAddressUseCase();
    const { address } = await registerCompanyAddressUseCase.execute({
      cityName,
      street,
      neighborhood,
      number,
      complement,
      zipCode,
      userId,
    });

    reply.status(201).send({ address });
  } catch (error) {
    if (error instanceof CompanyAlreadyExistsError) {
      reply.status(404).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
