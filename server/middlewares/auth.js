const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.user = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token) return res.status(401).json({ error: 'Token boş bırakılamaz.' })
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if(!decodedToken) return res.status(401).json({ error: 'Yetkisiz deneme.' })

        const user = await User.findOne({ _id: decodedToken.id }, 'id')

        if(!user) return res.status(401).json({ error: 'Yetkisiz deneme.' })
        if(user.blocked) return res.status(401).json({ error: 'Kullanıcı engellenmiş.' })

        req.id = decodedToken.id

        next()

    } catch {
        return res.status(401).json({ error: 'Yetkisiz deneme.' })
    }
}
