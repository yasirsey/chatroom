const { v4 } = require('uuid')
const moment = require('moment')

const User = require('../models/user')
const { sendEmail } = require('../utils/mailer')

exports.getUsers = (req, res, next) => {
    User.find({}, 'username bio profilePhoto role', (err, users) => {
        if(err) res.status(500).json(err)
        res.status(200).json(users)
    })
}

exports.getUserByID = async (req, res, next) => {
    const user = await User.findById(req.params.id, 'username bio profilePhoto role')
    
    if(!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' })

    return res.status(200).json(user)
}

exports.createUser = async (req, res, next) => {

    const data = {
        username,
        email,
        password,
	gender
    } = req.body

    const user = new User(data)
    user.save()

    return res.status(200).json({
        id: user.id,
        username: user.username,
        role: user.role,
	gender: user.gender
    })
}

exports.forgotPassword = async (req, res, next) => {

    const who = req.body.who
    const user = await User.findOne({ $or:[ {username: who}, {email: who} ]})

    if(!user) return res.status(400).json({ error: 'Kullanıcı bulunamadı.' })
    if(user.blocked) return res.status(400).json({ error: 'Kullanıcı engellenmiş.' })

    const token = v4(16)
    const url = `http://localhost:5000/users/resetpassword/${token}`

    user.resetPasswordToken = token
    user.resetPasswordExpire = moment().add(10, 'minutes')

    user.save()

    const data = {
        from: '<noreply@morposit.com',
        to: user.email,
        subject: 'Şifreni Sıfırla 👻" - Morposit',
        text: `Şifreni sıfırlamak için bağlantıya tıkla: ${url}`
    }

    const result = await sendEmail(data)

    if(result.error) return res.status(500).json(result)
    
    return res.status(200).json(result)
}

exports.getResetPassword = async (req, res, next) => {
    const user = await User.findOne({ $and:[ {resetPasswordToken: req.params.token}, {resetPasswordExpire: {$gt: moment()}} ] })
    
    if(!user) return res.status(400).json({ error: 'Şifre yenileme linki geçersiz.' })
    if(user.blocked) return res.status(400).json({ error: 'Kullanıcı engellenmiş.' })

    return res.status(200).json({ message: 'Yeni şifrenizi oluşturabilirsiniz.' })
}

exports.resetPassword = async (req, res, next) => {
    const user = await User.findOne({ $and:[ {resetPasswordToken: req.params.token}, {resetPasswordExpire: {$gt: moment()}} ] })
    
    if(!user) return res.status(400).json({ error: 'Şifre yenileme linki geçersiz.' })
    if(user.blocked) return res.status(400).json({ error: 'Kullanıcı engellenmiş.' })

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    user.passsword = req.body.password

    user.save()

    return res.status(200).json({ message: 'Şifreniz başarıyla güncellendi, tekrar giriş yapabilirsiniz.' })
}
