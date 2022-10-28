// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { newsletter } from "./newsletter";

export const appRouter = router({
  newsletter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
