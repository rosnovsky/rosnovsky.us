// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { newsletter } from "./newsletter";
import { comments } from "./comments";

export const appRouter = router({
  newsletter,
  comments
});

// export type definition of API
export type AppRouter = typeof appRouter;
