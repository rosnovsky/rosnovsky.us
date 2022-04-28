const Search = () => {
  return (
    <div className="relative mx-auto md:w-80">
      <img
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        src="/flex-ui-assets/elements/blog/search.svg"
        alt=""
      />
      <input
        className="w-full py-3 pl-12 pr-4 text-coolGray-900 leading-tight placeholder-coolGray-500 border border-coolGray-200 rounded-lg shadow-xsm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
