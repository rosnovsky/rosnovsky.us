function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function startsWithDotDotSlash(path) {
  const c1 = path[0];
  const c2 = path[1];
  const c3 = path[2];
  return c1 === "." && c2 === "." && c3 === "/";
}
function startsWithDotSlash(path) {
  const c1 = path[0];
  const c2 = path[1];
  return c1 === "." && c2 === "/";
}
function isRelativePath(path) {
  return startsWithDotDotSlash(path) || startsWithDotSlash(path);
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

export { DEFAULT_HASH_PROPS as D, VALID_INPUT_FORMATS as V, VALID_SUPPORTED_FORMATS as a, DEFAULT_OUTPUT_FORMAT as b, isRelativePath as c, isRemotePath as i, joinPaths as j, prependForwardSlash as p, removeBase as r };
