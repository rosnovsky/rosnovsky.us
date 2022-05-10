import dynamic from 'next/dynamic';
const NewsletterInput = dynamic(() => import('./NewsletterInput'));

const NewsletterForm = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div
          className="relative py-16 md:py-32 px-6 text-center bg-coolGray-50 overflow-hidden rounded-7xl"
          style={{
            backgroundImage: `url('/flex-ui-assets/elements/pattern-light1.svg')`,
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 mx-auto md:max-w-2xl">
            <h3 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
              Subscribe to the newsletter
            </h3>
            <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
              Get updates, new posts, photos, projects, ideas, and more!
            </p>
            <NewsletterInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
