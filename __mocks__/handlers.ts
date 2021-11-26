import { rest } from 'msw';

export const handlers = [
  rest.get('https://rosnovsky.us/api/status', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'up',
      })
    );
  }),
  rest.get('https://rosnovsky.us/api/stats', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        subscribers: '666',
        issues: '13',
      })
    );
  }),

  rest.get(
    'https://rosnovsky.us/api/comments/getCommentsCount',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          totalComments: 666,
        })
      );
    }
  ),

  rest.get(`https://rosnovsky.us/api/comments/getComments`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          user_id: 'user',
          published_at: '2021-10-28T05:08:31.043+00:00',
          comment: 'Comment',
          flagged: false,
          deleted: false,
          edited: false,
          post_id: 'test',
          hash: '@@@',
        },
      ])
    );
  }),

  rest.get('https://rosnovsky.us/api/last-played', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          albumImageUrl:
            'https://i.scdn.co/image/ab67616d0000b273f8f9c9f9d8f9c9f9c9f9c9f9',
          title: 'The Best of The Doors',
          artist: 'The Doors',
          songUrl: 'https://open.spotify.com/track/3wY7lqYqQZ7QZqQZqQZqQ',
        },
      ])
    );
  }),
  rest.get('https://rosnovsky.us/api/top-tracks', (req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json({
        tracks: [
          {
            title: 'Just Like Fire (From "Alice Through the Looking Glass")',
            album:
              'Just Like Fire (From "Alice Through the Looking Glass") - Single',
            artist: 'P!nk',
            albumImageUrl:
              'https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/75/fa/96/75fa96de-a780-4cc2-f9ee-ad1c88e3f742/886445831344.jpg/300x300bb.jpg',
            songUrl:
              'https://music.apple.com/us/album/just-like-fire-from-alice-through-the-looking-glass/1101931648?i=1101931754',
          },
          {
            title: 'Go Big or Go Home',
            album: 'What We Live For',
            artist: 'American Authors',
            albumImageUrl:
              'https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/03/79/dc/0379dc08-7dfc-99a5-f9d5-230226487457/00602547860187.rgb.jpg/300x300bb.jpg',
            songUrl:
              'https://music.apple.com/us/album/go-big-or-go-home/1440844649?i=1440845165',
          },
        ],
      })
    );
  }),

  rest.get('https://rosnovsky.us/api/top-tracks', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({}));
  }),

  rest.get(
    'http://localhost:3000/api/comments/userProfile?user_id=1',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }
  ),

  rest.get(
    'https://rosnovsky.us/api/subscribe',
    (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ "error": "error" }));
    }
  ),


];
