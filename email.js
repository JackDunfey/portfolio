const nodemailer = require('nodemailer');
require('dotenv/config');
const sender = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
function sendEMail(towhom,name,subject, message, email, phone){
  sender.sendMail({
      from: 'jackdunfey01@gmail.com',
      to: towhom,
      subject: 'Contact Us Form Submission - ' + subject,
      text: `${name} submitted the contact us form on your portfolio page. They wrote the following message:\n\n${message}\n\n\nTelephone: ${phone}\nEmail: ${email}`
    }, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = sendEMail;
