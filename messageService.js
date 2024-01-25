const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const Mailgen = require("mailgen");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const { email } = req.body;

  await sendWelcomeEmail(email);

  res.send("webhook recieved successfully");
});

app.listen(5051, () => {
  console.log("Listening");
});
const email = process.env.USEREMAIL;
const password = process.env.PASSWORD;

async function sendWelcomeEmail(reciverEmail) {
  let config = {
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Welcome",
      link: "https://mailgen.js/",
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  let response = {
    body: {
      name: "Hi there",
      intro: `Hi,\n\nWelcome to Your App! We're excited to have you on board.`,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: email,
    to: reciverEmail,

    subject: "Welcome email",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      //   return res.status(201).json({
      //     msg: "You should recieve an email",
      //   });
      console.log("you should have sent an email");
    })
    .catch((error) => {
      //   return res.status(500).json({ error });
      console.log(error);
    });
}

module.exports = app;
