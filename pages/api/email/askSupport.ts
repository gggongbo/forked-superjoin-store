import type { NextApiRequest, NextApiResponse } from 'next';
import support from '@service/support/email';

// change : arrow function need return value 오류로 리턴값 추가
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, title, text } = req.body;
    return support(email, title, text)
      .then(() => {
        return res.status(200).json({ result: true });
      })
      .catch(() => res.status(500).json({}));
  }
  return res.status(405).json(`${req.method} Method Not Allowd`);
};

export default handler;
