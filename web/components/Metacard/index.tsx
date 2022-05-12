import Microlink from '@lib/metaCard';

type Props = {
  url: string;
  size?: string;
  media?: string;
};

const Metacard = ({ url, size, media }: Props) => {
  return (
    <Microlink
      url={url}
      fetchData
      size={size || 'normal'}
      media={media || 'logo'}
    />
  );
};

export default Metacard;

const MetacardPlaceholder = () => {
  return <div>Loading...</div>;
};
