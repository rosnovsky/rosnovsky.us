import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'n3o7a5dl', // you can find this in sanity.json
  dataset: 'prod', // or the name you chose in step 1
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production' ? true : false, // `false` if you want to ensure fresh data
});
