//1) PACKAGE REQUESTS
const express = require('express');
const morgan = require('morgan');
const app = express();


//2) ROUTES REQUESTS
const purchaseRoutes = require('./routes/purchaseRoutes');


//3) MIDDLEWARE
console.log(process.env.NODE_ENV);
app.use(express.json()); // FOR BEING ABLE TO USE REQ AND MORE or you can use bodyparser
app.use(morgan('dev')) //DISPLAYS ROUTE ACCESSED WITH RESPONSE TIME
app.use(express.static('./public'));
app.use((req, res, next) => {
    console.log('hello from the middleware');

    next();
})

//4) APP.USE ROUTES DECLARATION MIDDLEWARE
app.use('/api/v1/purchase', purchaseRoutes);



app.all('*', (req, res, next) => {

    
    const err = new Error(`cant find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404;
    
    return next(err);

})

app.use((err, req, res, next) => {


    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'Ooops something went wrong';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })

    next();
})


module.exports = app;
