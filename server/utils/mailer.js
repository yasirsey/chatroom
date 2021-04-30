const nodemailer = require('nodemailer')

const sendEmail = async (data) => {
    const testAccount = nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "yasirsey@gmail.com",
          pass: "şifremyokburdameraketmepuşt",
        },
    })
    
    try {
        await transporter.sendMail(data)
        return { message: 'Şifre yenileme linki email adresinize gönderildi.' }
    } catch {
        return { error: 'Mail gönderilirken bir hata oluştu. Lütfen bizimle iletişime geçin.' }
    }
}

module.exports = { sendEmail }
