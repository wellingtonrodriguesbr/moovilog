import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function getUserProfileController(
	req: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = req.user.sub;

	try {
		const getUserProfileUseCase = makeGetUserProfileUseCase();
		const { user } = await getUserProfileUseCase.execute({
			userId,
		});

		reply.status(200).send({ user });
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			reply.status(404).send({ message: error.message });
		}
		throw error;
	}
}
