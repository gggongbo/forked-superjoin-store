import { collection, DocumentData, getDocs, query } from 'firebase/firestore';

import { QaType } from '@constants/types/support';
import { db } from '@service/app';

const getAllQa = async (): Promise<QaType[]> => {
  const q = query(collection(db, 'support'));
  const querySnapshot = await getDocs(q);
  return Promise.all(
    querySnapshot.docs.map(async (value: DocumentData) => {
      return value.data();
    }),
  );
};

// TODO: 백엔드 서버 로직에서 메일 전송하도록 변경
const sendMail = async (email: string, subject: string, text: string) => {
  console.log('mail', email, subject, text);
  // const transporter = nodemailer.createTransport({
  //   host: 'smtps.hiworks.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: 'support@superjo.in',
  //     // pass: process.env.EMAIL_PASSWORD,
  //     pass: 'super2020!',
  //   },
  // });

  // const mailOptions = {
  //   from: email,
  //   to: 'support@superjo.in',
  //   subject: `[업체 문의] ${subject}`,
  //   text,
  // };

  // transporter.sendMail(mailOptions, (error: any, info: { response: any }) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(`Email sent: ${info.response}`);
  //   }
  // });
};

export const supportService = { getAllQa, sendMail };
