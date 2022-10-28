// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "../db/client";

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts) => {
  return {
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async () => {
  return await createContextInner({
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
