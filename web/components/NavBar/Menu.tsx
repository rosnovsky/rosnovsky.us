import { Grid } from '@nextui-org/react';
import { Switcher } from './Switch';
import { Link } from '@nextui-org/react';
import NextLink from 'next/link';

export const Menu = () => {
  return (
    <Grid.Container md justify="center" alignItems="center" gap={3}>
      <Grid>
        <NextLink href="/blog">
          <Link underline color="text">
            Blog
          </Link>
        </NextLink>
      </Grid>
      <Grid>
        <NextLink href="/blog">
          <Link underline color="text">
            Stats
          </Link>
        </NextLink>
      </Grid>
      <Grid>
        <NextLink href="/blog">
          <Link underline color="text">
            About
          </Link>
        </NextLink>
      </Grid>
      <Grid>
        <NextLink href="/blog">
          <Link underline color="text">
            Login
          </Link>
        </NextLink>
      </Grid>
      <Switcher />
    </Grid.Container>
  );
};
