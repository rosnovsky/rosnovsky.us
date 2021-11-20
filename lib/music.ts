// TODO: Switch from Spotify to Apple Music. Figure out a way to show the last played song depending on whether it was played on Spotify or Apple Music.

// Apple Music variables and secrets
const APPLE_USER_TOKEN = process.env.APPLE_USER_TOKEN;
const APPLE_DEV_TOKEN = process.env.APPLE_DEV_TOKEN;
const LAST_TRACKS_APPLE =
  'https://api.music.apple.com/v1/me/recent/played/tracks?types=songs&limit=10';
const LAST_PLAYED_APPLE =
  'https://api.music.apple.com/v1/me/recent/played/tracks?types=songs';

export const getLastPlayedAppleMusicTrack = async () => {
  return fetch(LAST_PLAYED_APPLE, {
    headers: {
      Authorization: `Bearer ${APPLE_DEV_TOKEN}`,
      'Music-User-Token': `${APPLE_USER_TOKEN}`
    }
  });
};

export const getLastPlayedAppleMusicTracks = async () => {
  return fetch(LAST_TRACKS_APPLE, {
    headers: {
      Authorization: `Bearer ${APPLE_DEV_TOKEN}`,
      'Music-User-Token': `${APPLE_USER_TOKEN}`
    }
  });
};
