import { rest } from 'msw'

export const handlers = [
  rest.get('https://rosnovsky.us/api/status', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json({
        "status": "up"
      })
    )
  }),

  rest.get('https://rosnovsky.us/api/last-played', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json({
        albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273f8f9c9f9d8f9c9f9c9f9c9f9",
        title: "The Best of The Doors",
        artist: "The Doors",
        songUrl: "https://open.spotify.com/track/3wY7lqYqQZ7QZqQZqQZqQ",
      })
    )
  }),
]

