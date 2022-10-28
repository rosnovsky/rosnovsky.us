import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const newsletter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        hello: `Hello ${input?.text ?? "world"}`,
      };
    }),
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }).required())
    .query(async ({ input }) => {
      const { email } = input;
      try {
        const API_KEY = process.env.BUTTONDOWN_API_KEY;
        const response = await fetch(
          `https://api.buttondown.email/v1/subscribers`,
          {
            body: JSON.stringify({
              email,
              tags: ['rosnovsky.us'],
            }),
            headers: {
              Authorization: `Token ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        if (response.status >= 400) {
          const text = await response.text();

          if (text.includes('already subscribed')) {
            return {
              error: `You're already subscribed to my mailing list.`,
            }
          }

          return {
            error: text,
          };
        }

        return { error: '' }
      } catch (error: any) {
        return { error: error.message || error.toString() }
      }
    })
});
