import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeRegisterRouteUseCase } from "@/modules/route/use-cases/factories/make-register-route-use-case";

import z from "zod";

export class RegisterRouteController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const registerRouteBodySchema = z.object({
      name: z.string(),
      stateAcronym: z.enum([
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ]),
      cityNames: z.array(z.string()),
    });

    const userId = req.user.sub;

    const { name, cityNames, stateAcronym } = registerRouteBodySchema.parse(req.body);

    try {
      const registerRouteUseCase = makeRegisterRouteUseCase();
      const { route } = await registerRouteUseCase.execute({
        name,
        stateAcronym,
        cityNames,
        userId,
      });

      reply.status(201).send({ route });
    } catch (error) {
      if (error instanceof BadRequestError) {
        reply.status(400).send({ message: error.message });
      }
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      if (error instanceof NotAllowedError) {
        reply.status(403).send({ message: error.message });
      }

      throw error;
    }
  }
}
