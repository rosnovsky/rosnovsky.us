import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function ProtectedPage() {
  return <div className="text-black">Protected content</div>;
}

export const getServerSideProps = withPageAuthRequired();
