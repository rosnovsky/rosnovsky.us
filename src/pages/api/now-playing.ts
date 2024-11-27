export const prerender = false

export async function GET({ request }: { request: Request }) {
  try {
    const response = await fetch(
      'https://music.rosnovsky.us/api/songs?sort=lastViewedAt:desc&limit=1',
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1',
          'x-fun': Date.now().toLocaleString()
        },
      }
    );
    const data = await response.json();
    console.log({ data })
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch music data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
