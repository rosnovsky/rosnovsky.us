// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { posts, post } from "./posts";
import { uniquesThisMonth } from "./stats";
import { status } from "./status";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("blog.", posts)
  .merge("blog.", post)
  .merge("meta.", uniquesThisMonth)
  .merge("meta.", status);

// export type definition of API
export type AppRouter = typeof appRouter;
