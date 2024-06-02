import nodemailer from 'nodemailer';
import activationEmailHTML from '../template/email/activationEmail.js'
import dotev from 'dotenv'
import resetPassEmailHTML from '../template/email/resetPassEmail.js';
dotev.config()

const transporter = nodemailer.createTransport({
    service: process.env.SMTP_EMAIL_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL_LOGIN,
        pass: process.env.SMTP_EMAIL_PASS
    }
});

export async function sendEmail (email, subject, html) {
    
    const mailOptions = {
        from: process.env.SMTP_EMAIL_LOGIN,
        to: email,
        subject: subject,
        text: "",
        html: `<span style="opacity: 0;">🎉 Спасибо, что подписан на наши новости! Мы очень рады, что вы с нами! 🌟</span> ${html}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            return true
        }
    });
}

export function sendActivationLink (to, link) {

    const mailOptions = {
        from: process.env.SMTP_EMAIL_LOGIN,
        to: to,
        subject: "Подтверждение аккаунта",
        text: '',
        html: `<span style="opacity: 0;">⚡️Подтвердите свой аккаунт, чтобы получить доступ к новым функциям!⚡️</span> ${activationEmailHTML(link)}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}

export function sendResetPassLink (to, link) {

    const mailOptions = {
        from: process.env.SMTP_EMAIL_LOGIN,
        to: to,
        subject: "Сброс пароля" ,
        text: '',
        html: `<span style="opacity: 0;">🔐 Нажмите здесь, чтобы сбросить пароль и получить доступ к своему аккаунту! 🔒</span> ${resetPassEmailHTML(link)}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
}