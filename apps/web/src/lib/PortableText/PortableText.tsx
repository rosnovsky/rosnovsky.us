
import { ImageComponent as Image } from './Image';
import { Video } from './Video';
import { Youtube } from './Youtube';
import { MetacardComponent as Metacard } from './Metacard';
import { LinkComponent as Link } from './Link';
import { Code } from './Code';

export const PortableTextComponents = {
  types: {
    video: Video,
    image: Image,
    youtube: Youtube,
    code: Code,
    metacard: Metacard,
  },
  marks: {
    link: Link
  },
};
