import type { User } from "@/types/user";

export async function fetchUsers({
  pageParam = 1,
  limit = 20,
  gender,
  role,
}: any): Promise<User[]> {
  const params = new URLSearchParams({
    _page: String(pageParam),
    _limit: String(limit),
  });

  if (gender) params.append("gender", gender);
  if (role) params.append("Role", role);

  const res = await fetch(
    `http://localhost:5001/users?${params.toString()}`
  );

  return res.json();
}
