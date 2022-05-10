import CoverBackground from './CoverBackground';
import Cover from './Cover';

const Video = () => {
  return (
    <div className="w-full md:w-1/2 px-4">
      <div className="relative mx-auto md:mr-0 max-w-max">
        {/* <CoverBackground /> */}
        <Cover />
      </div>
    </div>
  );
};

export default Video;
