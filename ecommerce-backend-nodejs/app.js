//jshint esversion: 6
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const cors = require( 'cors' );
require( 'dotenv' ).config();

//import routes
const authRoutes = require( './routes/auth' );
const userRoutes = require( './routes/user' );
const categoryRoutes = require( './routes/category' );
const productRoutes = require( './routes/product' );
const braintreeRoutes = require( './routes/braintree' );
const orderRoutes = require( './routes/order' );



//app
const app = express();

//db
mongoose.connect( process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => console.log( "database connected" ) )
    .catch( ( err ) => console.log( err ) );


//middlewares 
app.use( morgan( 'dev' ) );
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( cors() );

//routes middleware
app.use( "/api", authRoutes );
app.use( "/api", userRoutes );
app.use( "/api", categoryRoutes );
app.use( "/api", productRoutes );
app.use( "/api", braintreeRoutes );
app.use( "/api", orderRoutes );


const port = process.env.PORT;
app.listen( port || 8000, () =>
{
    console.log( `server started succesfully on port ${ port }` );
} );