import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import nodemailer from 'nodemailer';

import { QaType } from '@constants/types/support';
import { db } from '@service/app';

const getAllQa = async (): Promise<QaType[]> => {
  const qaQuery = query(collection(db, 'support'));
  const querySnapshot = await getDocs(qaQuery);
  return Promise.all(
    querySnapshot.docs.map(async (qaDoc: DocumentData) => {
      const qaData = await qaDoc.data();
      return qaData;
    }),
  );
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
