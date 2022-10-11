import { FaAppStore } from 'react-icons/fa';

export default {
  name: 'software',
  title: 'Software',
  type: 'document',
  description: 'Software I use',
  icon: FaAppStore,
  fields: [
    {
      name: 'name',
      title: 'name',
      type: 'string',
    },
    {
      name: 'site',
      title: 'Site',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Webapp', value: 'Webapp' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Desktop App', value: 'Desktop App' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'kind.value',
    },
  },
};
