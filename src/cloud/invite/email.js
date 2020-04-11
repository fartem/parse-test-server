const Nodemailer = require('nodemailer')

const noReplyTransporter = Nodemailer.createTransport({
  host: process.env.EMAIL_SEVER_HOST,
  port: process.env.EMAIL_SEVER_PORT,
  secure: process.env.EMAIL_SEVER_SECURE === '1',
  auth: {
    user: process.env.EMAIL_SEVER_USER,
    pass: process.env.EMAIL_SEVER_PASSWORD
  }
})

async function sendNoReply (data) {
  await noReplyTransporter.sendMail(data)
}

module.exports = {
  sendNoReply
}
