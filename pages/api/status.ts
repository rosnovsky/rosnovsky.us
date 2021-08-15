import { NextApiRequest, NextApiResponse } from 'next';

const getStatus = async () => {
  return fetch('https://betteruptime.com/api/v2/monitors/395442', {
    headers: {'Authorization': `Bearer ${process.env.STATUS}`}
  })
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result = await getStatus();
  return res.status(200).send({result: result.json()})
}

