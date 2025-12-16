import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUsersInfinite } from "@/hooks/useUsersInfinite";
import { UsersToolbar } from "@/components/users/UsersToolbar";
import { UsersTable } from "@/components/users/usersTabls";
import { UsersHeader } from "@/components/users/UserHeader";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [role, setRole] = useState("all");

  const debouncedSearch = useDebounce(search.trim().toLowerCase());

  const normalizedGender = gender === "all" ? "" : gender;
  const normalizedRole = role === "all" ? "" : role;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsersInfinite({
    gender: normalizedGender,
    role: normalizedRole,
  });
  const users = (data?.pages.flat() ?? []).filter((u) => {
    if (!debouncedSearch) return true;

    return (
      u.first_name.toLowerCase().includes(debouncedSearch) ||
      u.last_name.toLowerCase().includes(debouncedSearch)
    );
  });

  return (
    <div className="p-6 space-y-4">
        <UsersHeader />
      <UsersToolbar
        search={search}
        setSearch={setSearch}
        gender={gender}
        setGender={setGender}
        role={role}
        setRole={setRole}
      />

      <UsersTable
        users={users}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
