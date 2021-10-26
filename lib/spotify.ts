// TODO: Switch from Spotify to Apple Music. Figure out a way to show the last played song depending on whether it was played on Spotify or Apple Music.

import querystring from 'querystring';

// Spotify variables and secrets
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOP_TRACKS_SPOTIFY = `https://api.spotify.com/v1/me/top/tracks`;
const LAST_PLAYED_SPOTIFY = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT_SPOTIFY = `https://accounts.spotify.com/api/token`;

// Apple Music variables and secrets
const APPLE_USER_TOKEN = process.env.APPLE_USER_TOKEN
const APPLE_DEV_TOKEN = process.env.APPLE_DEV_TOKEN
const TOP_TRACKS_APPLE = ''
const LAST_PLAYED_APPLE = 'https://api.music.apple.com/v1/me/recent/played/tracks?limit=1&types=library-songs'

type AppleMusicTrack = {
    "data": 
        {
            "id": string,
            "type": string,
            "href": string
            "attributes": {
                "artwork": {
                    "width": number,
                    "height": number,
                    "url": string
                },
                "artistName": string,
                "discNumber": number,
                "genreNames": string[],
                "durationInMillis": number,
                "name": string,
                "hasLyrics": boolean,
                "albumName": string,
                "playParams": {
                    "id": string,
                    "kind": string,
                    "isLibrary": boolean,
                    "reporting": boolean
                },
                "trackNumber": number
            }
        }[]
    
}

export const getLastPlayedAppleMusicTrack = async () => {
//    const { access_token } = await getAccessToken();

  return fetch(LAST_PLAYED_APPLE, {
    headers: {
        Authorization: `Bearer ${APPLE_DEV_TOKEN}`,
        'Music-User-Token': `${APPLE_USER_TOKEN}`
    }
  });


}

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT_SPOTIFY, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_SPOTIFY, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getLastPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(LAST_PLAYED_SPOTIFY, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
