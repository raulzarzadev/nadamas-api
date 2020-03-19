const mongoose = require('mongoose');

//configuraciones para evitar los nuevos warnings de mongoose

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const URI = `mongodb://localhost/4toTimer`

mongoose.connect(URI)
    .then(db => console.log(`DB is connected`))
    .catch(err => console.log(err));



module.exports = mongoose;
