import { Grid } from '@nextui-org/react';
import { Logo } from './Logo';
import { Menu } from './Menu';

export const NavBar = () => {
  return (
    <Grid.Container
      css={{ m: '0', p: '0' }}
      lg
      justify="space-between"
      alignItems="center"
    >
      <Grid>
        <Logo />
      </Grid>
      <Grid>
        <Grid alignContent="center">
          <Menu />
        </Grid>
      </Grid>
    </Grid.Container>
  );
};
