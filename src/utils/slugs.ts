export function slugify(inputString: string) {
  return inputString.replace(/ /g, '-').toLowerCase()
}

export function reverseSlug(slug: string) {
  return slug
    ?.replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
