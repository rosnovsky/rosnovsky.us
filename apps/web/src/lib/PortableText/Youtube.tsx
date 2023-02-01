import { Suspense } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import getYouTubeId from 'get-youtube-id';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export const Youtube = ({ value }) => {
  return (
    <div className="embed-responsive aspect-ratio-16/9 w-full my-3 max-h-3xl">
      <Suspense fallback={<div>Loading...</div>}>
        <LiteYouTubeEmbed
          id={getYouTubeId(value.url) || ""} // Default none, id of the video or playlist
          adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
          params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
          playlist={false} // Use  true when your ID be from a playlist
          poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
          title="YouTube Embed" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
          noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
          webp={true} // Default false, use webp format for the poster image
        /></Suspense>
    </div>
  );
}
