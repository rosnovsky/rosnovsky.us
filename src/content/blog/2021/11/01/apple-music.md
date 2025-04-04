---
title: 'Listening now: Apple Music'
publishDate: 2021-11-01
description: "At the bottom of this page you can find the latest song I've listened to on Apple Music. Here's how I made it works."
category: 'Web Development'
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
---

> This whole thing requires that you have an active paid Apple Developer account. It's $100/yr and is not worth it unless you plan on using it for something else besides "current music"

Apple Music is my primary music service. I do listen to Spotify every now and again (their recomendation engine is unmatched), but being an Apple household, it makes sense to mostly use Apple Music.

When I started working on this blog, I took a lot of inspiration from Lee Robinson. He has this little Spotify widget displaying the current song, and while it was easy to adapt and use it, it was not what I wanted. What I wanted was a widget displaying the last song I listened to on Apple Music. Which, apparently, is not trivial.

## Apple Music API

For the longest time I couldn't find a way to use Apple's MusicKit or Music API on the web. Their developer documentation is pretty poor, especially when it comes to the web stuff. At last, I figured that I'm looking for the user listening history, and there's an API endpoint for that.

This endpoint requires two different authorization tokens: `Developer token` & `user music token`. With the `Developer token`, one could query and perform actions within the Music store. And with the `user music token`, one could query and perform actions within the user's music library. So, how do you get those?

## Getting tokens

Now, the deal with the two tokens is that they are totally different, unrelated, yet somewhat connected: You need _both_ in order to fetch music history.

The developer token is a JWT that you build yourself, and sign with a private key you get at the Apple deloper portal. [More on this here](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens).

The user music token appears to be some kind of opaque token, which you can only get after a user explicitly logs into their Apple Music account and grants your app access to their Apple Music account. So far, I was unable to find a way to generate or obtain this token programmatically. What's worse, this token expires after 6 months (fixed) and there's no way to renew it.

This last bit matters because in this whole equasion, you can generate the developer token yourself. You can obtain the user music token. But from here, you cannot update the user token, so in 6 months you'll _have to_ generate a new one, in the browser, by logging in, manually, as some sort of animal.

FInally, it's a quest to figure out _how_ to get this user token, and crappy docs don't really help. Here's how you do it:

- Scaffold an HTML page with a `<script>` tag pointing to the MusicKit script
- Add "Sign in with Apple" button to the page (here's how)
- Deploy the app (to Vercel or Netlify, or wherever, otherwise you'd have to work around a bunch of issues)
- Login on this newly deployed page, grant it access to your Apple Music account
- Open Developer Tools, and in "Storage" section find the token OR add `<script>console.log(response)</script>` to the page and just copy the token from console. Feel free to try it out [here]()

Not very intuitive, but it works. Now you have 6 months to use this token, and after that you'd need to do the same thing again.

As for the Developer token, I used Auth0's `jsonwebtoken` library. It allows you to both sign and verify JWT tokens. I store my private and public keys in environment variables, and sign the token like this:

```typescript
import jwt from 'jsonwebtoken';

const generateToken = async (): string => {
  const privateKey = process.env.PRIVATE_KEY;
  const keyId = process.env.KEY_ID;
  const teamId = process.env.TEAM_ID;

  const developerToken = jwt.sign(
    {},
    `-----BEGIN PRIVATE KEY-----\n` +
      privateKey +
      `\n-----END PRIVATE KEY-----`,
    {
      algorithm: 'ES256',
      keyid: keyId,
      issuer: teamId,
      expiresIn: '5s',
    }
  );

  return developerToken;
};
```

That's about it. Now, that you've got both tokens, everything else is pretty straightforward.

## Fetching Last Played songs

The API itself is fairly conventional. The only specific thing about is is that it's poorly docimented (you don't know for sure what shape the response object will be for different resources) and the fact that you need to supply both Bearer token for Authorization header and a `user-music-token` as a different header. With both tokens in hand, it might look something like this:

```typescript
const getLastPlayedAppleMusicTrack = async () => {

  return fetch('https://api.music.apple.com/v1/me/recent/played/tracks?types=songs' {
    headers: {
        Authorization: `Bearer ${APPLE_DEV_TOKEN}`,
        'Music-User-Token': `${APPLE_USER_TOKEN}`
    }
  });
}
```

In response you'll get something like this:

```json
{
  "id": "994724222",
  "type": "songs",
  "href": "/v1/catalog/us/songs/994724222",
  "attributes": {
    "previews": [
      {
        "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/10/fd/80/10fd8022-fcc4-682b-f987-3f56a35de1a5/mzaf_6476922705197379324.plus.aac.p.m4a"
      }
    ],
    "artwork": {
      "width": 1412,
      "height": 1412,
      "url": "https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/65/07/df/6507dfce-ca4f-254e-3eae-6fc2ad4e255b/5nizza.jpg/{w}x{h}bb.jpg",
      "bgColor": "ffffff",
      "textColor1": "1a0c06",
      "textColor2": "023c17",
      "textColor3": "483c38",
      "textColor4": "356346"
    },
    "artistName": "5'nizza",
    "url": "https://music.apple.com/us/album/%D1%8F-%D0%BD%D0%B5-%D1%82%D0%BE%D0%B9/994724217?i=994724222",
    "discNumber": 1,
    "genreNames": ["Reggae", "Music"],
    "durationInMillis": 166640,
    "releaseDate": "2003-11-07",
    "name": "Я не той…",
    "isrc": "UALA11500030",
    "hasLyrics": true,
    "albumName": "Пятница",
    "playParams": {
      "id": "994724222",
      "kind": "song"
    },
    "trackNumber": 2
  }
}
```

Keep in mind that this shape is not set in stone, and some songs will have all these attributes, some will not (at least that was the case for me).

## Showing off

Finally, you'd want to show visitors what you've got. This is the easy part (haha).

I'm a huge fan of [SWR](https://swr.vercel.app) - Stale While Revalidate. It's a great way to cache data, refetch stale data, and just generally have a robust way of updating things every now and then without reloading the page or requiring a user action.

Here's the most basic example:

```typescript
import useSWR from 'swr';

import fetcher from '../../lib/fetcher';
import Track from '@components/Track';

export default function NowPlaying() {
  const { data, error } = useSWR('/api/last-played',
    fetcher, {
      refreshInterval: 18000,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      focusThrottleInterval: 9000
  });

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Something went terribly wrong...</div>;

  return data ? <Track track={data} /> : null
```

Here I request that SWR refetches new data regularly, refetches it on focus (if a user scrolles away from the Now Playing component, or switches to a different tab and comes back), and refetches data on reconnect (if the user's connection is lost, and reconnects).

The `fetcher` function is a simple wrapper around `fetch` that returns a promise:

```typescript
export default async function Fetcher(...args) {
  const res = await fetch(...args);

  return res.json();
}
```

I pass the `data` to the Track component for rendering:

```typescript
import Image from "next/image";
import { shimmer, toBase64 } from "./Utils/MDXComponents";

export default function Track({track}) {
  return (
    <div className="flex flex-row max-w-3xl pl-2 pt-1 mt-8">
      <div>
      // This is wonky. Since Next.js Static Image
      // component doesn't support static imports
      // of remote images (duh), I have to use a workaround
      // for blur placeholder. It's a simple shimmer that
      // takes exact space of an image white it's lazy-loading
        <Image className="w-full" width="50" height="50"
        src={track.albumImageUrl} placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,
        ${toBase64(shimmer(50, 50))}`} alt={track.title}
        layout="intrinsic" />
        </div>
      <div className="flex flex-col pl-5">
        <a
          className="font-medium xl:w-96 text-gray-900 dark:text-gray-100 truncate sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p
          className="text-gray-500 mb-4 truncate w-60 sm:w-96 md:w-full"
          color="gray.500"
        >
          {track.artist}
        </p>
      </div>
    </div>
  );
}
```

That's about it. The result looks like this:

That's about it. Oh, I've also went ahead and spun up a repo for this specific thing, feel free to check it out: [current-apple-music](https://github.com/rosnovsky/current-apple-music). This one generates an image of the current song playing on Apple Music that you can use in your website or in your Github profile's README ;)
