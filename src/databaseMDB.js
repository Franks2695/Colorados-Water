const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Sorel:violadores@viernes.2qyqm.mongodb.net/PI_58?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

/* let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/PI_58'
} else {
    urlDB = 'mongodb+srv://Sorel:violadores@viernes.2qyqm.mongodb.net/PI_58?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB; */