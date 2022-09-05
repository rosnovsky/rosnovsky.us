import { createRouter } from "./context";
import { z } from "zod";
import sanityClient from "../../utils/sanityClient";
import { indexPagePostsQuery } from "../../utils/queries";

export const posts = createRouter().query("getPosts", {
  async resolve() {
    // fetch posts from sanity.io and return them
    const posts = await sanityClient.fetch(indexPagePostsQuery, {
      pagePostsLimit: 10,
    });

    return {
      posts,
    };
  },
});

export const post = createRouter().query("getPost", {
  input: z
    .object({
      id: z.string(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `Fetched post ${input?.id}`,
    };
  },
});
