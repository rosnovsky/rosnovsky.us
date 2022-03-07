import { createClient, createPreviewSubscriptionHook } from 'next-sanity';
// import ReactTooltip from 'react-tooltip';
import createImageUrlBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react';

import { config } from './sanityConfig';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);

export const PortableText = (props) => (
  <PortableTextComponent components={{}} {...props} />
);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
