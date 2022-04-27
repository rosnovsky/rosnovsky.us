import { Text } from '@nextui-org/react';

export const Logo = () => {
  return (
    <Text
      h2
      css={{
        p: '0',
        '@xs': {
          textAlign: 'left',
        },
        '@sm': {
          textAlign: 'left',
        },
        '@md': {
          textAlign: 'left',
        },
        '@lg': {
          textAlign: 'left',
        },
      }}
    >
      Rosnovsky Park
    </Text>
  );
};
