const NewsletterInput = () => {
  return (
    <div className="mx-auto md:max-w-md text-left">
      <div className="flex flex-wrap mb-1">
        <div className="w-full md:flex-1 mb-3 md:mb-0 md:mr-6">
          <input
            className="w-full py-3 px-4 text-coolGray-500 leading-tight placeholder-coolGray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-coolGray-200 rounded-lg shadow-xsm"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full md:w-auto">
          <a
            className="inline-block py-3 px-5 w-full leading-5 text-white bg-blue-500 hover:bg-blue-600 font-medium text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm"
            href="1"
          >
            Subscribe
          </a>
        </div>
      </div>
      <span className="text-xs text-coolGray-500 font-medium">
        <span>We care about your data in our&nbsp;</span>
        <a className="text-blue-500 hover:text-blue-600" href="1">
          privacy policy
        </a>
      </span>
    </div>
  );
};

export default NewsletterInput;
