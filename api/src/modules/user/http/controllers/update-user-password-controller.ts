import { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdateUserPasswordUseCase } from "@/modules/user/use-cases/factories/make-update-user-password-use-case";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { BadRequestError } from "@/modules/shared/errors/bad-request-error";

import z from "zod";

export class UpdateUserPasswordController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const updateUserPasswordBodySchema = z.object({
      userId: z.string(),
      newPassword: z.string().min(8),
      confirmNewPassword: z.string().min(8),
    });

    const { userId, newPassword, confirmNewPassword } = updateUserPasswordBodySchema.parse(req.body);

    try {
      const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase();
      await updateUserPasswordUseCase.execute({
        userId,
        newPassword,
        confirmNewPassword,
      });

      reply.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      if (error instanceof BadRequestError) {
        reply.status(400).send({ message: error.message });
      }

      throw error;
    }
  }
}
