export const queryKeys = {
  users: {
    all: ["users"] as const,
    infinite: (params?: Record<string, any>) =>
      ["users", "infinite", params] as const,
  },
};
