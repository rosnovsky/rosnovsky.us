import type { NextPage } from 'next';
import { Container } from '@nextui-org/react';
import { NavBar } from '@components/NavBar';

const Home: NextPage = () => {
  return (
    <Container responsive sm css={{ p: '0' }} gap={1}>
      <NavBar />
    </Container>
  );
};

export default Home;
