import Link from 'next/link';

const Menu = () => {
  return (
    <div className="w-full">
      <ul className="flex align-center justify-center flex:flex-row">
        <li className="mr-12">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="1">Blog</Link>
          </span>
        </li>
        <li className="mr-12">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="1">Stats</Link>
          </span>
        </li>
        <li>
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="1">About</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
