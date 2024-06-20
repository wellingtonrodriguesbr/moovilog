import { useLocalStorage } from "react-use";

export function useUserAuthenticate() {
  const [accessToken] = useLocalStorage<string>("accessToken");

  return { isAuthenticate: accessToken ? true : false };
}
