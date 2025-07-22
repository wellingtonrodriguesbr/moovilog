import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface SendEmailToResetPasswordData {
  email: string;
}

export function useSendEmailToResetPassword() {
  const {
    mutateAsync: sendEmailToResetPassword,
    isPending: isPendingSendEmailToResetPassword,
    status,
  } = useMutation({
    mutationFn: handleSendEmailToResetPassword,
  });

  async function handleSendEmailToResetPassword(data: SendEmailToResetPasswordData) {
    await api.post("/user/send-email-to-reset-password", {
      ...data,
    });
  }

  return {
    sendEmailToResetPassword,
    isPendingSendEmailToResetPassword,
    status,
  };
}
