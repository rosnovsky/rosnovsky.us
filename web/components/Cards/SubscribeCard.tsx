import { useState, useRef } from 'react';
import useSWR from 'swr';
import format from 'comma-number';
import { trackGoal } from 'fathom-client';
import fetch from 'isomorphic-fetch';

import { formHasErrors, formStatus } from '../Utils/FormUtils';

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

const url =
  process.env.NODE_ENV === 'test'
    ? 'https://rosnovsky.us/api/stats'
    : '/api/stats';

export default function SubscribeCard() {
  const [form, setForm] = useState({
    state: '',
    message: '',
  });
  const inputEl = useRef<HTMLInputElement>(null);

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load- {error.message}</div>;
  if (!data) return <div>Subscribers Loading...</div>;

  const subscriberCount = format(data?.subscribers);
  const issuesCount = format(data?.issues);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ state: 'loading', message: '' });
    if (!inputEl.current) return;
    const res = await fetch(
      process.env.NODE_ENV === 'test'
        ? 'https://rosnovsky.us/api/subscribe'
        : '/api/subscribe',
      {
        body: JSON.stringify({
          email: inputEl.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    const { error } = await res.json();
    if (error) {
      setForm({
        state: 'error',
        message: error,
      });
      return;
    }

    trackGoal('VDNNZGJ4', 0);
    inputEl.current.value = '';
    setForm({
      state: 'success',
      message: `Hooray! You're now on the list.`,
    });
  };

  return (
    <div className="border border-green-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-green-50 dark:bg-green-opaque">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        Subscribe to the newsletter
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        Get updates, new posts, photos, projects, ideas, and more!
      </p>
      <form className="relative my-4" onSubmit={(e) => subscribe(e)}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="art@art0.us"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-green-500 focus:border-green-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
          type="submit"
          data-testid="subscribe-button"
        >
          {formStatus(form)}
        </button>
      </form>
      {formHasErrors(form)}
      <p className="text-sm text-gray-800 dark:text-gray-200">
        {`${subscriberCount || ''} subscribers - `}
        {issuesCount || 'no'} issues
      </p>
    </div>
  );
}