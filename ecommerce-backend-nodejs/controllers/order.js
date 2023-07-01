const { Order, CartItem } = require( '../models/order' )
const { errorHandler } = require( "../helpers/dbErroeHandler" );
const { json } = require( 'body-parser' );


exports.orderById = ( req, res, next, id ) =>
{
    Order.findById( id )
        .populate( 'products.product', 'name price' )
        .then( ( order ) =>
        {
            res.order = order;
            next();
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};


exports.create = ( req, res ) =>
{
    //console.log( "CREATE ORDER: ", req.body );

    req.body.order.user = req.profile;
    const order = new Order( req.body.order )
    order.save()
        .then( ( data ) =>
        {
            res.json( data );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( error )
            } );
        } );
};


exports.listOrders = ( req, res ) =>
{
    Order.find()
        .populate( "user", "_id name address " )
        .sort( "-createdAt" )
        .then( ( orders ) =>
        {
            res.json( orders );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( error )
            } );
        } );
};


exports.getStatusValues = ( req, res ) =>
{
    res.json( Order.schema.path( "status" ).enumValues );
}

exports.updateOrderStatus = ( req, res ) =>
{
    Order.updateOne(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } }
    ).then( ( order ) =>
    {
        res.json( order );
    } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};