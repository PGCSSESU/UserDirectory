import { infiniteQueryOptions } from "@tanstack/react-query";
import { infiniteFetcher } from "@/api/infiniteFetcher";
import { queryKeys } from "@/queryKeys";
import type { Users } from "@/types/user";

type UsersParams = {
  q?: string;
  Role?: string;
  gender?: string;
};

export const usersInfiniteQueryOptions = (params?: UsersParams) =>
  infiniteQueryOptions({
    queryKey: queryKeys.users.infinite(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      infiniteFetcher<Users>({
        endpoint: "http://localhost:5001/users",
        pageParam,
        limit: 20,
        params,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,

    // 🔑 makes filters smooth (no flicker)
    placeholderData: (prev) => prev,
  });
