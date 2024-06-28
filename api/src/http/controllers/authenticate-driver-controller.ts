import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateDriverUseCase } from "@/use-cases/factories/make-authenticate-driver-use-case";

import dayjs from "dayjs";
import z from "zod";

export async function authenticateDriverController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateDriverBodySchema = z.object({
    documentNumber: z.string(),
    password: z.string().min(8),
  });

  const { documentNumber, password } = authenticateDriverBodySchema.parse(
    req.body
  );

  try {
    const authenticateDriverUseCase = makeAuthenticateDriverUseCase();
    const { driver } = await authenticateDriverUseCase.execute({
      documentNumber,
      password,
    });

    const token = await reply.jwtSign(
      {
        documentNumber: driver.documentNumber,
      },
      {
        sign: {
          sub: driver.id,
          expiresIn: "10m",
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        documentNumber: driver.documentNumber,
      },
      {
        sign: {
          sub: driver.id,
        },
      }
    );

    reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        domain: process.env.COOKIES_DOMAIN,
        sameSite: true,
        httpOnly: true,
        expires: dayjs().add(7, "day").toDate(),
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
