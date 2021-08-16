import { NextApiRequest, NextApiResponse } from 'next';

const getStatus = async () => {
  const status = fetch('https://betteruptime.com/api/v2/monitors/395442', {
    headers: {'Authorization': `Bearer ${process.env.STATUS}`}
  }).then(result => result.json())
  console.log(status)
  return status
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const result: Status = await getStatus();
  return res.status(200).send({status: result.data.attributes.status})
}

