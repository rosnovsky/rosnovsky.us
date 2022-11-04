import * as trpc from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '../db/client'
import * as jose from 'jose'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({req, res}: trpcNext.CreateNextContextOptions) => {
  const getUser = withApiAuthRequired(function(req, res) {
    const session = getSession(req, res);
    if (!session) {
      throw new Error('Error: user not found');
    }
    if (session && !session.user.email_verified)
      throw new Error('Error: email not verified');
    return session.user
  })
  const user = await getUser(req, res);
  console.log(user)
  return {user}
}

export type Context = inferAsyncReturnType<typeof createContext>
