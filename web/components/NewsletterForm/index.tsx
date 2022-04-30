import NewsletterInput from './NewsletterInput';

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
          <img
            className="opacity-20 md:opacity-100 absolute top-0 left-0 w-28 md:w-auto"
            src="/flex-ui-assets/elements/wave3-yellow.svg"
            alt=""
          />
          <img
            className="opacity-30 md:opacity-100 absolute right-6 top-0 w-28 md:w-auto"
            src="/flex-ui-assets/elements/dots3-green.svg"
            alt=""
          />
          <img
            className="opacity-30 md:opacity-100 absolute right-0 bottom-0 w-28 md:w-auto"
            src="/flex-ui-assets/elements/wave3-red.svg"
            alt=""
          />
          <img
            className="absolute left-6 bottom-0 md:bottom-0 opacity-20 md:opacity-100 w-28 md:w-auto"
            src="/flex-ui-assets/elements/dots3-violet.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
