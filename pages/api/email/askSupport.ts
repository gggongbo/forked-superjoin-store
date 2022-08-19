import type { NextApiRequest, NextApiResponse } from 'next';
import support from '@service/support/email';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, title, text } = req.body;
    support(email, title, text)
      .then(() => {
        return res.status(200).json({ result: true });
      })
      .catch(() => res.status(500).json({}));
  } else {
    return res.status(405).json(`${req.method} Method Not Allowd`);
  }
};

export default handler;
