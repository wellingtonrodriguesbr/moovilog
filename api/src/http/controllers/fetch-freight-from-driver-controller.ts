import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchFreightsFromDriverUseCase } from "@/use-cases/factories/make-fetch-freights-from-driver-use-case";

export async function fetchFreightFromDriverController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const driverId = req.user.sub;

	try {
		const fetchFreightFromDriverUseCase = makeFetchFreightsFromDriverUseCase();
		const { freights } = await fetchFreightFromDriverUseCase.execute({
			driverId,
		});

		reply.status(200).send({ freights });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
