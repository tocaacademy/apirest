const sgMail = require("@sendgrid/mail");
const sendMail = async (email, subject, text) => {
  try {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: email,
      from: "support@tocaacademy.com", // Use the email address or domain you verified above
      subject: subject,
      text: text,
      html: text,
    };

    const send = await sgMail.send(msg);
    console.log(send);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
