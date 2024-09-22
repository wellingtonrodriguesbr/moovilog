import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetFreightInformationAsADriverUseCase } from "@/use-cases/factories/make-get-freight-information-as-a-driver-use-case";

import z from "zod";

export async function getFreightInformationAsADriverController(
	req: FastifyRequest,
	reply: FastifyReply
) {
	const getFreightInformationAsADriverParamsSchema = z.object({
		freightId: z.string(),
	});

	const driverId = req.user.sub;
	const { freightId } = getFreightInformationAsADriverParamsSchema.parse(
		req.params
	);

	try {
		const getFreightInformationAsADriverUseCase =
			makeGetFreightInformationAsADriverUseCase();
		const { freightInformation } =
			await getFreightInformationAsADriverUseCase.execute({
				driverId,
				freightId,
			});

		reply.status(200).send({ freightInformation });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
