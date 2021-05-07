const nodemailer = require('nodemailer')

const smtpConfig = {
    // "connectionString": process.env.MONGODB_URI || 'mongodb://localhost:27017/home-inventory',
    // "secret": process.env.SECRET,
    // "emailFrom": process.env.EMAIL_FROM,
    // smtpOptions: {
        host: process.env.SMTP_SERVER,
        port: 587,
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASS
        }
    // }
}

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
    const transporter = nodemailer.createTransport(smtpConfig)
    await transporter.sendMail({ from, to, subject, html })
}

module.exports = sendEmail
