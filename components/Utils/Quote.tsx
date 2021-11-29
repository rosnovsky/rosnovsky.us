const Quote = ({ quote }) => (
  <blockquote className="relative p-4 text-xl italic border-l-4 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-500 dark:border-gray-200 quote mb-5">
    <div className="stylistic-quote-mark" aria-hidden="true">
      ...
    </div>
    <p className="mb-4 text-gray-800 dark:text-gray-400">{quote}</p>
  </blockquote>
);

export default Quote;
