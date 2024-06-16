import { FastifyReply, FastifyRequest } from "fastify";
import { driverAuthenticateUseCase } from "@/use-cases/driver-authenticate-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

import dayjs from "dayjs";
import z from "zod";

export async function driverAuthenticateController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const driverauthenticateBodySchema = z.object({
    documentNumber: z.string(),
    password: z.string().min(8),
  });

  const { documentNumber, password } = driverauthenticateBodySchema.parse(
    req.body
  );

  try {
    const { driver } = await driverAuthenticateUseCase({
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
