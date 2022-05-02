import Link from 'next/link';

const Categories = ({ categories }) => {
  return (
    <ul
      id="categories"
      className="hidden md:flex md:flex-wrap mb-8 -mx-2 text-center"
    >
      {categories &&
        categories.map((category) => {
          return (
            <li key={category.slug.current} className="w-full md:w-auto px-2">
              <div className="inline-block w-full py-2 px-4 mb-4 md:mb-0 text-sm text-coolGray-400 hover:text-blue-500 hover:bg-blue-200 font-bold rounded-md hover:shadow-sm">
                <Link
                  href={`/category/${category.slug.current}#categories`}
                  passHref
                >
                  {category.title}
                </Link>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Categories;
