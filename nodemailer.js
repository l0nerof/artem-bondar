require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const { MAILER_MAIL, MAILER_PASSWORD } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/css", express.static(path.join(__dirname, "/css")));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/js", express.static(path.join(__dirname, "/js")));

app.post("/", (req, res) => {
  console.log(req.body);
  const { name, phone } = req.body;
  const transport = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: MAILER_MAIL,
      pass: MAILER_PASSWORD,
    },
  });

  const message = {
    to: "2005volka@gmail.com",
    from: MAILER_MAIL,
    subject: "Новий замовник!",
    html: `<h1>Привіт! Новий замовник залишив контактні дані на сайті.</h1><p><strong>Ім'я:</strong> ${name}</p><p><strong>Телефон:</strong> ${phone}</p>`,
    text: "Привіт! Новий замовник залишив контактні дані на сайті.",
  };

  transport.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Помилка відправки листа");
    } else {
      console.log("Лист успішно відправлено: " + info.response);
      res.status(200).send("Лист успішно відправлено");
    }
  });
  res.status(200).send("Дані отримано успішно");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3300, () => {
  console.log("Сервер запущено на http://localhost:3300/");
});
