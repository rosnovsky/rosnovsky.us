import SubscribeCard from '../components/Cards/SubscribeCard';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Subscribe Card',
  component: SubscribeCard,
};

export const Initial = () => <SubscribeCard />;
