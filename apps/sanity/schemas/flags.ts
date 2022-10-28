export default {
  name: 'flags',
  title: 'Flags',
  type: 'object',
  fields: [
    {
      name: 'isFlagged',
      title: 'Is flagged',
      type: 'boolean',
    },
    {
      name: 'isHidden',
      title: 'Is hidden',
      type: 'boolean',
    },
    {
      name: 'isEdited',
      title: 'Is edited',
      type: 'boolean',
      readOnly: () => true,
    },
  ],
};
