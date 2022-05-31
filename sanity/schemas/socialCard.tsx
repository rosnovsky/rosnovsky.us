import {Button} from '../components/socialCard';

const Preview = (value) => {
  return <img src={value} />
}

export default {
  name: 'socialCard',
  title: 'Social Card',
  type: 'document',
  fields: [
    {
      name: 'socialCardImage',
      title: 'Social Card Image',
      type: 'image',
      // validation: (Rule) => Rule.custom((_url, context) => {
      //   if (context.document.socialImageCard === undefined) {
      //     return "Generate or upload an image"
      //   }
      //   return true
      // }),
      readOnly: () => true
    },
    {
      name: 'socialCardButton',
      title: 'Social Card Button',
      type: 'boolean',
      inputComponent: Button,
    }
  ],
};
