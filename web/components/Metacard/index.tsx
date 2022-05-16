import MetaCard from '@lib/metaCard';

type Props = {
  url: string;
  size?: string;
  media?: string;
};

const Metacard = ({ url, size, media }: Props) => {
  return (
    <MetaCard
      url={url}
      fetchData
      size={size || 'normal'}
      media={media || 'logo'}
    />
  );
};

export default Metacard;
