import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'mail',
    host: 'smtp.mail.ru',
    port: 587,
    auth: {
        user: 'korobkabelaru@mail.ru',
        pass: 'zbL3kd0zacfhYgCf9mPn'
    }
});

const sendEmail = async (email, subject, html) => {
    const mailOptions = {
        from: 'korobkabelaru@mail.ru',
        to: email,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.error(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendEmail