const { model, Schema }  =require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
	gender: {
		type: String,
		enum : ['man','woman']
	},
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: 'avatar.jpg'
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpire: { type: Date, default: undefined },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function(next) {
    
    if (!this.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(this.password, salt, (err, hash) => {

            this.password = hash
            next()
        })
    })
})

userSchema.methods.comparePasswords = async function(password, cb) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('user', userSchema)
