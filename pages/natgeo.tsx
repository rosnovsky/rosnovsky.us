import SubscribeCard from '../components/Cards/SubscribeCard';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {useUser } from '@auth0/nextjs-auth0'

import Container from '../components/Container';

export default function NatGeo() {
  const { user, error } = useUser()
  return (
    <Container title="About – Art Rosnovsky">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          National Geographic FTW!
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-400">
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          {user ? `Cheers, ${user.name}!` : "I've got two questions: why and HOW?!!"}
        </h2>
      <SubscribeCard />
      </div>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired();
