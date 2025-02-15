import { $Enums, FinanceTransaction } from "@prisma/client";

export type IFinanceTransaction = FinanceTransaction;

export type IFinanceTransactionTypes = $Enums.FinanceTransactionType;
export type IFinanceTransactionStatus = $Enums.FinanceTransactionStatus;
export type IFinanceTransactionPaymentMethod = $Enums.PaymentMethod;
