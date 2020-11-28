import imageUrlBuilder from '@sanity/image-url';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import sanityConfig from '../../client-config';

const builder = imageUrlBuilder(sanityConfig.sanity);

export function imageUrlFor(source: SanityAsset) {
  return builder.image(source);
}
