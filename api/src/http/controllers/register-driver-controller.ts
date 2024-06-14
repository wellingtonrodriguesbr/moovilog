import { FastifyReply, FastifyRequest } from "fastify";
import { registerDriverUseCase } from "@/use-cases/register-driver-use-case";
import { DriverAlreadyExistsError } from "@/use-cases/errors/driver-already-exists-error";

import z from "zod";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

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
    companyId: z.string(),
  });

  const { name, password, documentNumber, phone, backupPhone, companyId } =
    registerDriverBodySchema.parse(req.body);

  const creatorId = req.user.sub;

  try {
    const { driverId } = await registerDriverUseCase({
      name,
      password,
      documentNumber,
      phone,
      backupPhone,
      creatorId,
      companyId,
    });

    reply.status(201).send({ driverId });
  } catch (error) {
    if (error instanceof DriverAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }
    if (error instanceof UnauthorizedError) {
      reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
