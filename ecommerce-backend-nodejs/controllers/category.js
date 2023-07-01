//jshint esversion: 6
const Category = require( '../models/category' );
const { errorHandler } = require( "../helpers/dbErroeHandler" );


exports.categoryById = ( req, res, next, id ) =>
{
    console.log( id );
    Category.findById( id )
        .then( ( category ) =>
        {
            req.category = category;
            next();
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: "Category does not exist"
            } );
        } );
};


exports.create = ( req, res ) =>
{
    const category = new Category( req.body );
    category.save()
        .then( ( data ) =>
        {
            res.json( { data } );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );

};



exports.read = ( req, res ) =>
{
    console.log( req.category );
    return res.json( req.category );
};



exports.update = ( req, res ) =>
{
    const category = req.category;
    category.name = req.body.name;
    category.save()
        .then( ( data ) =>
        {
            res.json( data );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};



exports.remove = ( req, res ) =>
{
    const category = req.category;
    category.deleteOne()
        .then( ( data ) =>
        {
            res.json( {
                message: "Category deleted"
            } );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: "category does not exist"
            } );
        } );
};



exports.list = ( req, res ) =>
{
    Category.find()
        .then( ( data ) =>
        {
            res.json( data );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};