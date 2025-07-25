import { User } from "@/interfaces";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetProfileResponse {
  user: User;
}

export function useGetProfile() {
  const { data: profile, isPending: isGetProfilePending } = useQuery({
    queryKey: ["user-profile"],
    queryFn: handleGetProfile,
  });

  async function handleGetProfile() {
    const { data } = await api.get<GetProfileResponse>("/me");

    return data.user;
  }

  return {
    profile,
    isGetProfilePending,
  };
}
