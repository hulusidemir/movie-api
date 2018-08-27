const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://hulusi:134679aa@ds235302.mlab.com:35302/movie-api', {
        useNewUrlParser: true
    })


    mongoose.connection.on('open', () => {
        console.log('MongoDB Bağlantısı Gerçekleştirildi');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB Bağlantısı Hatalı : ' + err);
    });
    mongoose.Promise = global.Promise; 
}