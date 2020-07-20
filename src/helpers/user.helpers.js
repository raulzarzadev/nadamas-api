const nodemailer = require("nodemailer");

const userHelper = {};

userHelper.sendEmail = (email, subjet, content) => {
  async function main() {
    // Generate test SMTP service account from ethereal.email

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GEMAIL_SENDER,
        pass: process.env.GEMAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: ` Raul Zarza 👻 <${process.env.GEMAIL_SENDER}>`, // sender address
      to: email, // list of receivers
      subject: subjet, // Subject line
      text: content, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

module.exports = userHelper;
