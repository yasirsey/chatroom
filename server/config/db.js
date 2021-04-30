const mongoose = require('mongoose')

const connectDB = () => mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) console.error(err)
    console.log('Connected to databse.')
})

module.exports = connectDB