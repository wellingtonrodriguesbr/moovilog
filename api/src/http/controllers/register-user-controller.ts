import { FastifyReply, FastifyRequest } from "fastify";
import { registerUserUseCase } from "@/use-cases/register-user-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

import z from "zod";

export async function registerUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = registerUserBodySchema.parse(req.body);

  try {
    const { userId } = await registerUserUseCase({ name, email, password });

    reply.status(201).send({ userId });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
