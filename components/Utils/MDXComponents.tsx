import Link from 'next/link';
import Image from 'next/image';

// import ProsCard from '../Cards/ProsCard';
// import ConsCard from '../Cards/ConsCard';
// import Gumroad from '../metrics/Gumroad';
// import Unsplash from '../metrics/Unsplash';
// import Analytics from '../metrics/Analytics';
// import YouTube from '../metrics/Youtube';
import Step from '../Step';

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  Image,
  a: CustomLink,
  Step
};

export default MDXComponents;
