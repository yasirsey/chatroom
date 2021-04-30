const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.login = async (req, res, next) => {
    const { who, password } = req.body

    const user = await User.findOne({ $or: [{username: who}, {email: who}] })

    if(!user) return res.status(404).json({ error: 'Giriş bilgileriniz hatalı.' })
    if(user.blocked) return res.status(403).json({ error: 'Kullanıcı engellendi.' })

    const verify = await user.comparePasswords(password)

    if(!verify) return res.status(404).json({ error: 'Giriş bilgileriniz hatalı.' })

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE })

    res.status(200).json({token})
}
