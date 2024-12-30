import fetcher from "@/lib/fetcher";
import useSWR from "swr";
const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    "api/users/${userId}",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
