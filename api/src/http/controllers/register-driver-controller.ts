import { FastifyReply, FastifyRequest } from "fastify";
import { DriverAlreadyExistsError } from "@/use-cases/errors/driver-already-exists-error";
import { NotAllowedError } from "@/use-cases/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterDriverUseCase } from "@/use-cases/factories/make-register-driver-use-case";

import z from "zod";

export async function registerDriverController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerDriverBodySchema = z.object({
    name: z.string(),
    password: z.string(),
    documentNumber: z.string().min(11).max(11),
    phone: z.string().min(11).max(11),
    backupPhone: z.string().min(11).max(11).optional().nullable(),
  });

  const { name, password, documentNumber, phone, backupPhone } =
    registerDriverBodySchema.parse(req.body);

  const creatorId = req.user.sub;

  try {
    const registerDriverUseCase = makeRegisterDriverUseCase();
    const { driver } = await registerDriverUseCase.execute({
      name,
      password,
      documentNumber,
      phone,
      backupPhone,
      creatorId,
    });

    reply.status(201).send({ driverId: driver.id });
  } catch (error) {
    if (error instanceof DriverAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }
    if (error instanceof NotAllowedError) {
      reply.status(403).send({ message: error.message });
    }
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
