const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

//create express app
const app = express();

//port at which the server will run
const port = process.env.PORT;

//create end point
app.get("/", (request, response) => {
  //send 'Hi, from Node server' to client
  response.send("Hi, from Node server");
});

//create send email endpoint
app.get("/send-email", async (request, response) => {
  try {
    // create transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b341e1b9f6cdf2",
        pass: "a019f31f9d9e94"
      }
    });

    const emailData = {
      from: "example1@mail.com",
      to: "example2@mail.com",
      subject: "A test email",
      html: "<p> Hi there, this is a test email </p>"
    };

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    response.send(`An email successfully sent to ${emailData.to}`);
    console.log(info);
  } catch (e) {
    console.log(e);
    response.send(`An error occurred while sending email`);
  }
});

//start server and listen for the rewuest
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
