import {Button} from '../components/socialCard';

export default {
  name: 'socialCard',
  title: 'Social Card',
  type: 'object',
  fields: [
    {
      name: 'socialCardImage',
      title: 'Social Card URL',
      type: 'string',
      readOnly: () => true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'socialCardButton',
      title: 'Social Card Button',
      type: 'boolean',
      inputComponent: Button,
    }
  ],
};
