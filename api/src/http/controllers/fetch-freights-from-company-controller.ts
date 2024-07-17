import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchFreightsFromCompanyUseCase } from "@/use-cases/factories/make-fetch-freights-from-company-use-case";

export async function fetchFreightsFromCompanyController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const userId = req.user.sub;

  try {
    const fetchFreightsFromCompanyUseCase =
      makeFetchFreightsFromCompanyUseCase();
    const { freights } = await fetchFreightsFromCompanyUseCase.execute({
      userId,
    });

    reply.status(200).send({ freights });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
