const stats = async (req: any, res: any) => {
  const API_KEY = process.env.BUTTONDOWN_API_KEY;
  const issuesRes = await fetch('https://api.buttondown.email/v1/emails', {
    headers: {
      Authorization: `Token ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const subscribersRes = await fetch(
    'https://api.buttondown.email/v1/subscribers',
    {
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  );

  const issues = await issuesRes.json();
  const subscribers = await subscribersRes.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res
    .status(200)
    .json({ issues: issues.count, subscribers: subscribers.count });
};

export default stats;
