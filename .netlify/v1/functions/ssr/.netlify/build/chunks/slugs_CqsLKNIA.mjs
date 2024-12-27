function slugify(inputString) {
  return inputString.replace(/ /g, "-").toLowerCase();
}
function reverseSlug(slug) {
  return slug?.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

export { reverseSlug as r, slugify as s };
