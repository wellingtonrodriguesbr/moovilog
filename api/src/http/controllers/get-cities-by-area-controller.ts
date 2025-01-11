import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCitiesByAreaUseCase } from "@/use-cases/factories/make-get-cities-by-area-use-case";
import z from "zod";

export class GetCitiesByAreaController {
	static async handle(req: FastifyRequest, reply: FastifyReply) {
		const getCitiesByAreaControllerBodySchema = z.object({
			areaId: z.string().uuid(),
		});

		const { areaId } = getCitiesByAreaControllerBodySchema.parse(req.params);

		const userId = req.user.sub;

		try {
			const getCitiesByAreaUseCase = makeGetCitiesByAreaUseCase();
			const { cities } = await getCitiesByAreaUseCase.execute({
				userId,
				areaId,
			});

			reply.status(200).send({ cities });
		} catch (error) {
			if (error instanceof ResourceNotFoundError) {
				reply.status(404).send({ message: error.message });
			}

			throw error;
		}
	}
}
