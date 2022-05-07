type Props = {
  postCount: number;
};

const Header = ({ postCount }: Props) => {
  return (
    <>
      <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
        Rosnovsky Park™ Blog
      </h3>
      <p className="mb-10 text-lg md:text-xl text-coolGray-500 font-medium">
        My first blog on Livejournal was established in 2003. <br /> I&apos;ve
        started this one in 2019, posting {postCount} blog posts so far.
      </p>
    </>
  );
};

export default Header;
