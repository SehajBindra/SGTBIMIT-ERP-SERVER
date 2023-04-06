const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "SGTBIMIT",
    port: 5000,
    auth: {
      user: 'web.sgtbimit@gmail.com',
      pass: 'sgtbimit2023',
    },
  });
const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  
  const mailOptions = {
    from: 'web.sgtbimit@gmail.com',
    to: req.body.email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`
  };

  let info = await transporter.sendMail({
    from: 'web.sgtbimit@gmail.com', // sender address
    to: "", // list of receivers
    subject: "", // Subject line
    text: "", // plain text body
    html: "<b>OTP</b>", // html body
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending OTP');
    } else {
      console.log('Email sent: ' + info.response);
      
      // store the OTP and its expiration time
      otpData[req.body.email] = {
        otp: otp,
        expirationTime: Date.now() + otpExpirationTime
      };

      res.status(200).send('OTP sent successfully');
    }
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};


// // create a route to verify the OTP
// app.post('/verify-otp', (req, res) => {
//     const email = req.body.email;
//     const otp = req.body.otp;
  
//     // check if the email exists in the otpData object
//     if (!otpData.hasOwnProperty(email)) {
//       res.status(400).send('Invalid email or OTP');
//       return;
//     }
  
//     // check if the OTP is correct
//     if (otpData[email].otp !== otp) {
//       res.status(400).send('Invalid email or OTP');
//       return;
//     }
  
//     // check if the OTP has expired
//     if (Date.now() > otpData[email].expirationTime) {
//       res.status(400).send('OTP has expired');
//       return;
//     }
  
//     // delete the OTP data for the email
//     delete otpData[email];
  
//     res.status(200).send('OTP verified successfully');
//   });

module.exports = sendMail;
