import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component('./src/components/Callout.astro'),
      attributes: {
        type: { type: String },
        title: { type: String },
        content: { type: String },
      },
    },
  },
});
