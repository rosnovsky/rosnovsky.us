import { Button } from '@/components/Button';
import { client } from '@/utils/trpc';
import { useState } from 'react';

const mailIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="envelopeAltIconTitle" stroke="rgb(20 184 166)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" color="rgb(20 184 166)"> <title id="envelopeAltIconTitle">Envelope</title> <rect width="20" height="14" x="2" y="5" /> <path strokeLinecap="round" d="M2 5l10 9 10-9" /> </svg>


export const Newsletter = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<any>(false);
  const [success, setSuccess] = useState<any>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(null);
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const subscribe = await client.newsletter.subscribe.query({ email })
    if (subscribe.error) { setError(subscribe.error); setEmail(''); setLoading(false); return; }
    else setSuccess(true); setEmail('');
    setLoading(false);
    return subscribe;
  };

  return (
    <form
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {mailIcon}
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder={error ? error : `Email address`}
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => handleChange(e)}
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button href="" onClick={(e) => handleSubscribe(e)} type="submit" className={`ml-4 flex-none`} disabled={success || loading || error}>
          {success ? 'Thank you!' : loading ? 'Wait...' : error ? 'Sorry :(' : 'Subscribe'}
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </form>
  );
};
