//jshint esversion: 6
const { body, validationResult } = require( 'express-validator' );

exports.userSignupValidator = [
    body( "name", "Name is required" ).notEmpty(),
    body( "email", "Email must be between 3 to 32 characters" )
        .matches( /.+\@.+\..+/ )
        .withMessage( "Email must contain @" )
        .isLength( { min: 4, max: 32 } ),
    body( "password", "Password is required" ).notEmpty(),
    body( "password" )
        .isLength( { min: 6 } )
        .withMessage( "Password must contain at least 6 characters" )
        .matches( /\d/ )
        .withMessage( "Password must contain a number" ),
    ( req, res, next ) =>
    {
        const errors = validationResult( req );
        if ( !errors.isEmpty() )
        {
            const firstError = errors.array()[ 0 ].msg;
            return res.status( 400 ).json( { error: firstError } );
        }
        next();
    }
];
