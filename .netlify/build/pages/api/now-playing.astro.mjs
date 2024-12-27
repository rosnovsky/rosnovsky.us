export { renderers } from '../../renderers.mjs';

const prerender = false;
const MUSIC_API_URL = "https://music.rosnovsky.us";
const CACHE_MAX_AGE = 1800;
async function GET({ request }) {
  try {
    const response = await fetch(
      `${MUSIC_API_URL}/api/songs?sort=lastViewedAt:desc&limit=1`,
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}`
        },
        signal: AbortSignal.timeout(5e3)
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch music data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
