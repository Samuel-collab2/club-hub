import nodemailer from "nodemailer";
// require("dotenv").config();

export default async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: '"Do Not Reply" <donotreply@yourdomain.com>',
    to: to.join(",").trim(),
    subject,
    text,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}
