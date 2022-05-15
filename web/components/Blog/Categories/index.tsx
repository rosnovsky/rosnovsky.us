import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

const Categories = ({ categories }) => {
  return (
    <ul
      id="categories"
      className="hidden md:flex md:flex-wrap mb-8 -mx-2 text-center"
    >
      {categories &&
        categories.map((category) => {
          return (
            <li
              key={category.title}
              className="w-full md:w-auto px-2 cursor-pointer"
            >
              <a href={`/category/${category.slug.current}`}>
                <div className="inline-block w-full py-2 px-4 mb-4 md:mb-0 text-sm text-coolGray-400 hover:text-blue-700 hover:bg-blue-200 font-bold rounded-md hover:shadow-sm">
                  {category.title}
                </div>
              </a>
            </li>
          );
        })}
    </ul>
  );
};

export default Categories;
