import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface CompleteRegistrationData {
  phone: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function useCompleteRegistration() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("id");

  const { mutateAsync: completeRegistration, isPending: isPendingCompleteRegistration } = useMutation({
    mutationFn: handleCompleteRegistration,
  });

  async function handleCompleteRegistration(updateData: CompleteRegistrationData) {
    await api.put("/user/complete-registration", {
      userId,
      ...updateData,
    });
  }

  return { completeRegistration, isPendingCompleteRegistration };
}
