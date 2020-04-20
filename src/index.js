const express = require( 'express' );

const morgan = require( 'morgan' );

const app = express();

const cors = require( 'cors' );

const bodyParser = require( 'body-parser' );

const server = require( 'http' ).Server( app );

app.use( morgan( 'dev' ) );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( cors() );

app.use(require('./routes'));


server.listen(3353, () =>{
    console.log('server on port ' + 3353);
})