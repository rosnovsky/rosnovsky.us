import { FaLaptop } from 'react-icons/fa';

export default {
  name: 'hardware',
  title: 'Hardware',
  type: 'document',
  description: 'A hardware item I use',
  icon: FaLaptop,
  fields: [
    {
      name: 'brand',
      title: 'brand',
      type: 'string',
      description: 'Brand of the hardware',
      validation: (Rule) =>
        Rule.required().error(
          'You must provide the brand name, come on, you know it!'
        ),
    },
    {
      name: 'model',
      title: 'model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Laptop', value: 'laptop' },
          { title: 'Desktop', value: 'desktop' },
          { title: 'Tablet', value: 'tablet' },
          { title: 'Phone', value: 'phone' },
          { title: 'Gadget', value: 'gadget' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        "What is this hardware used for? What do you like about it? What don't you like about it?",
      validation: (Rule) =>
        Rule.required().error(
          'Description is required since its rendered on the website.'
        ),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price Paid',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'rating',
      options: {
        stars: 10,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datePurchased',
      title: 'Purchase Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'model',
      subtitle: 'brand',
      media: 'photo',
    },
  },
};
