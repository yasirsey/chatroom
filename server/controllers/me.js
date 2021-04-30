const User = require('../models/user')

exports.getProfile = async (req, res, next) => {
    const user = await User.findOne({ _id: req.id }, 'username email gender password')

    res.status(200).json({ user })
}

exports.updateProfile = async (req, res, next) => {

    try {
        const user = await User.findOne({ _id: req.id })

        if(req.body.username) user.username = req.body.username
        if(req.body.email) user.email = req.body.email
        if(req.body.password) user.password = req.body.password

        await user.save()
        return res.status(200).json({ message: 'Bilgiler başarıyla güncellendi.', user })
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.deleteProfile = async (req, res, next) => {
    try {
        await User.findOneAndDelete({ _id: req.id })

        res.status(200).json({ message: 'Hesabınız başarıyla silindi.' })
    } catch (error) {
        res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu, lütfen bize bildirin.' })
    }
}
