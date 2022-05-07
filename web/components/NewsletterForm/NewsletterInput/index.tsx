import Link from 'next/link';
import { useState } from 'react';

const NewsletterInput = () => {
  const [email, setEmail] = useState();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(null);
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    if (data.error) setError(data);
    else setSuccess(true);
    setLoading(false);
    return data;
  };

  return (
    <div className="mx-auto md:max-w-md text-left">
      <div className="flex flex-wrap mb-1">
        <div className="w-full md:flex-1 mb-3 md:mb-0 md:mr-6">
          <input
            className={`w-full py-3 px-4 text-coolGray-500 leading-tight placeholder-coolGray-500 focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-600 bg-red-100 text-red-900'
                : 'border-transparent'
            } focus:ring-blue-500 focus:ring-opacity-50 border border-coolGray-200 rounded-lg shadow-xsm`}
            type="email"
            placeholder="Enter your email"
            value={email}
            disabled={success}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full md:w-auto">
          <button
            type="submit"
            onClick={(e) => handleSubscribe(e)}
            className={`inline-block py-3 px-5 w-full leading-5 text-white ${
              success
                ? 'bg-green-500 cursor-not-allowed focus:ring-green-500'
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
            } font-medium text-center focus:ring-2 focus:ring-opacity-50 border  rounded-md shadow-sm`}
            disabled={success || loading}
          >
            {success ? 'Thank you!' : loading ? 'Wait...' : 'Subscribe'}
          </button>
        </div>
      </div>
      <span className="text-xs text-coolGray-500 font-medium">
        <div className="text-xs text-red-900">
          {error ? `Nope (${error.error})` : null}
        </div>
        <span>Learn about how I handle your&nbsp;</span>
        <span className="text-blue-500 hover:text-blue-600">
          <Link href="/privacy">privacy</Link>.
        </span>
      </span>
    </div>
  );
};

export default NewsletterInput;
