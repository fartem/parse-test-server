const Nodemailer = require('nodemailer')

const noReplyTransporter = Nodemailer.createTransport({
  host: '',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: ''
  }
})

async function sendNoReply (data) {
  await noReplyTransporter.sendMail(data)
}

module.exports = {
  sendNoReply
}
