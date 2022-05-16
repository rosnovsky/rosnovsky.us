import dynamic from 'next/dynamic';
const Comments = dynamic(() => import('./Comments'));
const Github = dynamic(() => import('./Github'));
const Subscribers = dynamic(() => import('./Subscribers'));
const Visitors = dynamic(() => import('./Visitors'));

const Stats = () => {
  return (
    <section
      className="py-20 xl:py-24 bg-white"
      style={{
        backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
        backgroundPosition: 'center',
      }}
    >
      <div className="container px-4 mx-auto">
        <div
          id="stats"
          className="flex flex-wrap justify-center text-center -mx-4"
        >
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
