import MuxPlayer from '@mux/mux-player-react';
import { Suspense } from 'react';

export const Video = ({ value }) => {
  return (
    <div className='w-full mx-auto'>
      <Suspense fallback={<div>Loading...</div>}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={value.videoFile.asset.playbackId}
          autoPlay={false}
          metadata={{
            title: value.title,
          }}
        ></MuxPlayer></Suspense>
      <p className="w-full mx-auto text-sm text-darkCoolGray-600 text-center">
        {value.title}
      </p>
    </div>
  );
}
