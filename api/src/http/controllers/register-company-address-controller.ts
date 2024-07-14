import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
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
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
