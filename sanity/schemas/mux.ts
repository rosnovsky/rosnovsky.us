export default {
  title: 'Video',
  name: 'video',
  type: 'document',
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    {
      title: 'Video file',
      name: 'videoFile',
      type: 'mux.video',
    },
  ],
};
