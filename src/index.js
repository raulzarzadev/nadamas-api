const app = require('./app');
const {mongoose} = require('./database')


app.listen(app.get('port'), ()=> {
    console.log(`server on port ${app.get('port')}`)
})
