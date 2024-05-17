const express = require('express');
const bodyParser = require('body-parser');

const drinksRoutes = require('./routes/drinks-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/drinks', drinksRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Ruta no existe', 404);
    throw error;
});

//manejo de errores
app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || 'Error desconocido'});
});

app.listen(3000);