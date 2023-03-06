import { collection, getDocs, query } from 'firebase/firestore';
import nodemailer from 'nodemailer';

import { QaType } from '@constants/types/support';
import { businessDb } from '@services/app';

const getAllQa = async (): Promise<QaType[]> => {
  const querySnapshot = await getDocs(query(collection(businessDb, 'support')));
  return querySnapshot.docs.map(qaDoc => qaDoc.data() as QaType);
};

const sendMail = async (
  mailer: typeof nodemailer,
  email: string,
  subject: string,
  text: string,
) => {
  const transporter = mailer.createTransport({
    host: 'smtps.hiworks.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@superjo.in',
      pass: process.env.EMAIL_PASSWORD,
      // pass: 'super2020!',
    },
  });

  const mailOptions = {
    from: email,
    to: 'support@superjo.in',
    subject: `[업체 문의] ${subject}`,
    text,
  };

  transporter.sendMail(mailOptions, (error: any, info: { response: any }) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

export const supportService = { getAllQa, sendMail };
