import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/modules/shared/errors/resource-not-found-error";
import { NotAllowedError } from "@/modules/shared/errors/not-allowed-error";
import { makeRegisterTransactionUseCase } from "@/modules/financial/use-cases/factories/make-register-transaction-use-case";

import z from "zod";

export class RegisterTransactionController {
  static async handle(req: FastifyRequest, reply: FastifyReply) {
    const registerTransactionBodySchema = z.object({
      description: z.string().optional().nullable(),
      amountInCents: z.coerce.number(),
      dueDate: z.coerce.date(),
      status: z.enum(["PENDING", "PAID", "OVERDUE"]),
      type: z.enum(["INCOME", "EXPENSE"]),
      paymentMethod: z.enum(["PIX", "CREDIT_CARD", "DEBIT_CARD", "CASH", "BANK_TRANSFER", "OTHER"]),
      categoryName: z.string(),
      driverId: z.string().uuid().optional().nullable(),
    });

    const registerTransactionParamsSchema = z.object({
      companyId: z.string().uuid(),
    });

    const { companyId } = registerTransactionParamsSchema.parse(req.params);
    const { description, amountInCents, dueDate, status, type, paymentMethod, categoryName, driverId } =
      registerTransactionBodySchema.parse(req.body);

    const userId = req.user.sub;

    try {
      const registerTransactionUseCase = makeRegisterTransactionUseCase();
      const { transaction } = await registerTransactionUseCase.execute({
        description,
        amountInCents,
        dueDate,
        status,
        type,
        paymentMethod,
        categoryName,
        companyId,
        creatorId: userId,
        driverId,
      });

      reply.status(201).send({ transaction });
    } catch (error) {
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
