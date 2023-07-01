//jshint esversion: 6
const User = require( '../models/user' );
const { Order } = require( "../models/order" )
const { errorHandler } = require( "../helpers/dbErroeHandler" );


exports.userById = ( req, res, next, id ) =>
{
    User.findById( id )
        .then( ( user ) =>
        {
            if ( user )
            {
                req.profile = user;
                next();
            }
            else
            {
                return res.status( 400 ).json( {
                    error: "User not found"
                } );
            }
        } );
};


exports.read = ( req, res ) =>
{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json( req.profile );
};


exports.update = ( req, res ) =>
{
    User.findOneAndUpdate( { _id: req.profile._id }, { $set: req.body }, { new: true } )
        .then( ( user ) =>
        {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json( user );
        } )
        .catch( ( err ) =>
        {
            console.log( err );
            return res.status( 400 ).json( {
                error: "You are not authorized to perform this action"
            } );
        } );
};


exports.addOrderToUserHistory = ( req, res, next ) =>
{
    let history = [];


    req.body.order.products.forEach( ( item ) =>
    {
        history.push( {
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        } )
    } )

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true }
    )
        .then( ( data ) =>
        {
            next();
        } )
        .catch( ( error ) =>
        {
            return res.status( 400 ).json( {
                error: 'Could not purchase history'
            } );
        } );
};


exports.purchaseHistory = ( req, res ) =>
{
    Order.find( { user: req.profile._id } )
        .populate( 'user', '_id name' )
        .sort( '-created' )
        .then( ( orders ) =>
        {
            res.json( orders );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};