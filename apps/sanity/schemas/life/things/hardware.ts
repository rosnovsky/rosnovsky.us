import { FaTools } from 'react-icons/fa';

export default {
  name: 'hardware',
  title: 'Hardware',
  type: 'document',
  description: 'Hardware I own',
  icon: FaTools,
  fields: [
    {
      name: 'make',
      title: 'Make',
      type: 'string',
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Phone', value: 'Phone' },
          { title: 'Tablet', value: 'Tablet' },
          { title: 'Laptop', value: 'Laptop' },
          { title: 'Desktop', value: 'Desktop' },
          { title: 'eReader', value: 'eReader' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'model',
      subtitle: 'make',
    },
  },
};
