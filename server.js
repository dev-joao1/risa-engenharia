const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/js')));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/pages/contato', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/contato.html'));
    console.log('this is the form that shows')
});

app.post('/pages/contato', (req, res) => {
    
    "use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "email-ssl.com.br",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.WEBMAIL_EMAIL, // generated ethereal user
          pass: process.env.WEBMAIL_PASS // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.WEBMAIL_EMAIL,// sender address
        to: process.env.WEBMAIL_EMAIL, // list of receivers
        subject: req.body.subject + ' - ' + 'Uma nova mensagem de ' + req.body.name,// Subject line
        text: req.body.message + 'Nome: ' + req.body.name + 'telefone: ' + req.body.tel + 'Email: ' + req.body.email, // plain text body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
        res.end('Mensagem enviada!')
});