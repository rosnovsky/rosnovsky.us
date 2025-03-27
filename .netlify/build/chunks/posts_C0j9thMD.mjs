import { g as getCollection } from './_astro_content_C_RUHwA_.mjs';

async function getTopCategories() {
  const posts = await getCollection("blog");
  const repeatingCategories = posts.map((post) => post.data.category);
  const categoryCount = /* @__PURE__ */ new Map();
  repeatingCategories.forEach((category) => {
    if (categoryCount.has(category)) {
      categoryCount.set(category, categoryCount.get(category) + 1);
    } else {
      categoryCount.set(category, 1);
    }
  });
  const uniqueCategories = [...new Set(repeatingCategories)];
  const categories = uniqueCategories.sort((category1, category2) => {
    let freq1 = categoryCount.get(category1);
    let freq2 = categoryCount.get(category2);
    return freq2 - freq1;
  });
  return categories.slice(0, 4);
}
function getNonDraftPosts(posts) {
  return posts.filter((post) => !post.data.draft);
}
function sortPosts(posts) {
  return getNonDraftPosts(posts).filter(Boolean).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}
async function getSortedPosts() {
  const posts = await getCollection("blog");
  return sortPosts(posts);
}

export { getTopCategories as a, getSortedPosts as g, sortPosts as s };
