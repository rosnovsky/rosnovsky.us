import Comments from './Comments';
import Github from './Github';
import Subscribers from './Subscribers';
import Visitors from './Visitors';

const Stats = () => {
  return (
    <section
      className="py-20 xl:py-24 bg-white"
      style={{
        backgroundImage: `url('flex-ui-assets/elements/pattern-white.svg')`,
        backgroundPosition: 'center',
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap justify-center text-center -mx-4">
          <Github />
          <Comments />
          <Subscribers />
          <Visitors />
        </div>
      </div>
    </section>
  );
};

export default Stats;
