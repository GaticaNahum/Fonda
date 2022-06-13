const express = require('express');
const morgan = require('morgan');

//Inicializar el paquete de express
const app = express();

//Definirle un puerto a la aplicación ->Se pon el process env port por si tenemos un puerto para que lo ocupe
//en el caso contrario usara el puerto 4000
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //->Se define que el intercambio de datos va a ser con json
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use(require('./routes/index.js'));
app.use('/food', require('./routes/food.js'));
app.use('/user', require('./routes/user.js'));

//Ejecutar el servidor
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
})