const nodemailer = require('nodemailer');

const send = async (email: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtps.hiworks.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@superjo.in',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: 'support@superjo.in',
    subject: `[업체 문의] ${subject}`,
    text: `text : ${text}\n email : ${email}`,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    },
  );
};

export default send;
