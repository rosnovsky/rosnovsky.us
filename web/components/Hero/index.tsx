import CoverImage from './CoverImage';
import WelcomeMessage from './WelcomeMessage';

export const Hero = () => {
  return (
    <div className="py-10 md:py-28">
      <div className="container px-4 mx-auto">
        <div
          className="flex flex-wrap xl:items-center -mx-4"
          style={{
            backgroundImage: `url(
              '/flex-ui-assets/elements/pattern-light-big.svg'
            )`,
            backgroundPosition: 'center',
          }}
        >
          <WelcomeMessage />
          <CoverImage />
        </div>
      </div>
    </div>
  );
};
