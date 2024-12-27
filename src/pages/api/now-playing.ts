export const prerender = false;

const MUSIC_API_URL = 'https://music.rosnovsky.us';
const CACHE_MAX_AGE = 1800;

export async function GET({ request }: { request: Request }) {
  try {
    const response = await fetch(
      `${MUSIC_API_URL}/api/songs?sort=lastViewedAt:desc&limit=1`,
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_MAX_AGE}`,
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch music data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
