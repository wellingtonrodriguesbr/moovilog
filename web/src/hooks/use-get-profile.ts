import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface ProfileResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function useGetProfile() {
  const { data: profile, isPending: isGetProfilePending } = useQuery({
    queryKey: ["user-profile"],
    queryFn: handleGetProfile,
  });

  async function handleGetProfile() {
    const { data } = await api.get<ProfileResponse>("/me");

    return data.user;
  }

  return {
    profile,
    isGetProfilePending,
  };
}
