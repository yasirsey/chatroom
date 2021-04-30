const Joi =  require('joi')
const User = require('../../models/user')

const usernameVal = async (req, res, next) => {

    const username = req.body.username

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(16).required().messages({
            "string.alphanum": "Kullanıcı adınız izin verilmeyen karakterler içeriyor.",
            "string.min": "Kullanıcı adınız en az 3 karakterden oluşmalıdır.",
            "string.max": "Kullanıcı adınız en fazla 16 karakterden oluşmalıdır.",
            "any.required": "Kullanıcı adı alanı boş bırakılamaz.",
        })
    })

    //error.message ile hata mesajına erişilebilir
    const JoiValidate = schema.validate({username})
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })

    //username unique validation
    const user = await User.findOne({ username })
    if(user) return res.status(400).json({ error: 'Bu kullanıcı adı alınmış.' })

    next()
}

const emailVal = async (req, res, next) => {

    const email = req.body.email

    const schema = Joi.object({
        email: Joi.string().email().max(45).required().messages({
            "string.email": "Lütfen geçerli bir e-posta girin.",
            "string.max": "Email adresin çok uzun, hoş şeyler yapmıyorsun.",
            "any.required": "E-posta alanı boş bırakılamaz.",
        })
    })

    //error.message ile hata mesajına erişilebilir
    const JoiValidate = schema.validate({email})
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })

    //username unique validation
    const user = await User.findOne({ email })
    if(user) return res.status(400).json({ error: 'E-posta adresi kayıtlı.' })

    next()
}

const passwordVal = async (req, res, next) => {

    const password = req.body.password

    const schema = Joi.object({
        password: Joi.string().min(8).max(30).required().messages({
            "string.min": "Şifreniz en az 8 karakterden oluşmalıdır.",
            "string.max": "Şifreniz en fazla 30 karakterden oluşmalıdır.",
            "any.required": "Şifre alanı boş bırakılamaz.",
        })
    })

    //error.message ile hata mesajına erişilebilir
    const JoiValidate = schema.validate({password})
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })

    next()
}

const bioVal = async (req, res, next) => {

    const bio = req.body.bio

    const schema = Joi.object({
        bio: Joi.string().max(230).messages({
            "string.max": "Bio'nuz en fazla 230 karakterden oluşmalıdır.",
        })
    })

    //error.message ile hata mesajına erişilebilir
    const JoiValidate = schema.validate({username})
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })

    next()
}

const registerVal = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(16).required().messages({
            "string.alphanum": "Kullanıcı adınız izin verilmeyen karakterler içeriyor.",
            "string.min": "Kullanıcı adınız en az 3 karakterden oluşmalıdır.",
            "string.max": "Kullanıcı adınız en fazla 16 karakterden oluşmalıdır.",
            "any.required": "Kullanıcı adı alanı boş bırakılamaz.",
        }),
        email: Joi.string().email().max(45).required().messages({
            "string.email": "Lütfen geçerli bir e-posta girin.",
            "string.max": "Email adresin çok uzun, hoş şeyler yapmıyorsun.",
            "any.required": "E-posta alanı boş bırakılamaz.",
        }),
        password: Joi.string().min(8).max(30).required().messages({
            "string.min": "Şifreniz en az 8 karakterden oluşmalıdır.",
            "string.max": "Şifreniz en fazla 30 karakterden oluşmalıdır.",
            "any.required": "Şifre alanı boş bırakılamaz.",
        })
    })

    const JoiValidate = schema.validate({ username, email, password })
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })


    //username unique validation
    const usernameTaken = await User.findOne({ username })
    if(usernameTaken) return res.status(400).json({ error: 'Bu kullanıcı adı alınmış.' })

    //email unique validation
    const emailTaken = await User.findOne({ email })
    if(emailTaken) return res.status(400).json({ error: 'E-posta adresi kayıtlı.' })

    next()
}

const updateVal = async (req, res, next) => {

    const {
        username,
        email,
        password
    } = req.body

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(16).messages({
            "string.alphanum": "Kullanıcı adınız izin verilmeyen karakterler içeriyor.",
            "string.min": "Kullanıcı adınız en az 3 karakterden oluşmalıdır.",
            "string.max": "Kullanıcı adınız en fazla 16 karakterden oluşmalıdır.",
            "any.required": "Kullanıcı adı alanı boş bırakılamaz.",
        }),
        email: Joi.string().email().max(45).messages({
            "string.email": "Lütfen geçerli bir e-posta girin.",
            "string.max": "Email adresin çok uzun, hoş şeyler yapmıyorsun.",
            "any.required": "E-posta alanı boş bırakılamaz.",
        }),
        password: Joi.string().min(8).max(30).messages({
            "string.min": "Şifreniz en az 8 karakterden oluşmalıdır.",
            "string.max": "Şifreniz en fazla 30 karakterden oluşmalıdır.",
            "any.required": "Şifre alanı boş bırakılamaz.",
        })
    })

    const JoiValidate = schema.validate({ username, email, password })
    if(JoiValidate.error) return res.status(400).json({ error: JoiValidate.error.message })


    //username unique validation
    const usernameTaken = await User.findOne({ username })
    if(usernameTaken) return res.status(400).json({ error: 'Bu kullanıcı adı alınmış.' })

    //email unique validation
    const emailTaken = await User.findOne({ email })
    if(emailTaken) return res.status(400).json({ error: 'E-posta adresi kayıtlı.' })

    next()
}

module.exports = {
    usernameVal,
    emailVal,
    passwordVal,
    bioVal,
    registerVal,
    updateVal
}
