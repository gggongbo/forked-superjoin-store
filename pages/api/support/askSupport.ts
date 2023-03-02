import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { supportService } from '@services/support';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqbody = JSON.parse(req.body);
    const { email, title, text } = reqbody;
    if (!email || !title || !text) throw new Error('Argument error');
    await supportService.sendMail(nodemailer, email, title, text);
  } catch (error) {
    return res.status(500).json({ error: `Unexpected error: ${error}` });
  }
  return res.status(200).json({ success: true });
};

export default handler;
