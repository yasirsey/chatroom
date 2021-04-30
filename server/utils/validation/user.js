const Joi =  require('joi')
const User = require('../../models/user')

const usernameVal = async (username) => {

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(15).required().messages({
            "string.alphanum": "Kullanıcı adınız izin verilmeyen karakterler içeriyor.",
            "string.min": "Kullanıcı adınız en az 3 karakterden oluşmalıdır.",
            "string.max": "Kullanıcı adınız en fazla 15 karakterden oluşmalıdır.",
            "any.required": "Kullanıcı adı alanı boş bırakılamaz.",
          })
    })

    //error.message ile hata mesajına erişilebilir
    const res = schema.validate({username})
    if(res.error) return res

    //username unique validation
    const user = await User.findOne({ username })
    if(user) return res.status
}

const emailVal = (email) => {

    const schema = Joi.object({
        email: Joi.string().email().alphanum().required().messages({
            "string.alphanum": "E-postanız izin verilmeyen karakterler içeriyor.",
            "string.email": "Lütfen geçerli bir e-posta girin.",
            "any.required": "E-posta alanı boş bırakılamaz.",
          })
    })

    //error.message ile hata mesajına erişilebilir
    return schema.validate({email})
}

const passwordVal = (password) => {

    const schema = Joi.object({
        password: Joi.string().min(8).max(30).required().messages({
            "string.min": "Şifreniz en az 8 karakterden oluşmalıdır.",
            "string.max": "Şifreniz en fazla 30 karakterden oluşmalıdır.",
            "any.required": "Şifre alanı boş bırakılamaz.",
          })
    })

    //error.message ile hata mesajına erişilebilir
    return schema.validate({password})
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

const updateVal = (data) => {

    const password = passwordVal(data.password)
    const email = emailVal(data.email)
    const username = usernameVal(data.username)
    const bio = usernameVal(data.bio)

    if(username.error) return username

    if(email.error) return email
    
    if(password.error) return password

    if(bio.error) return bio

    return { ...username, ...password, ...email, ...bio }
}

module.exports = {
    usernameVal,
    emailVal,
    passwordVal,
    updateVal
}