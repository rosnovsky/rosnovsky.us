import { ResolvedSanityImage } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';

export const localDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const urlFor = (source: ResolvedSanityImage) => {
  return imageUrlBuilder(sanityClient).image(source);
};
