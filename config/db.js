const mongoose = require('mongoose')

const DB_URI = 'mongodb+srv://danielmonroy:pokoyo13REFORZADO@cluster0.brz0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = () => {

    const connect = () => {

        mongoose.connect(
            DB_URI
        ).then(() => console.log('Conected!'))

    }

    connect();

}