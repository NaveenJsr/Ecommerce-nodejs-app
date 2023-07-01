//jshint esversion: 6
const _ = require( 'lodash' );
const fs = require( 'fs' );
const Product = require( '../models/product' );
const { errorHandler } = require( "../helpers/dbErroeHandler" );
const formidable = require( 'formidable-serverless' );
const product = require( '../models/product' );



exports.productById = ( req, res, next, id ) =>
{
    Product.findById( id )
        .populate( 'category' )
        .then( ( product ) =>
        {
            req.product = product;
            next();
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: "Product not found"
            } );
        } );
};


exports.read = ( req, res ) =>
{
    req.product.photo = undefined;
    return res.json( req.product );
};




exports.create = ( req, res ) =>
{
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, ( err, fields, files ) =>
    {
        if ( err )
        {
            console.error( err );
            return res.status( 400 ).json( {
                error: 'Form parsing error',
            } );
        }
        console.log( fields );

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if ( !name || !description || !price || !category || !quantity || !shipping )
        {
            return res.status( 400 ).json( {
                error: "All fields are required"
            } );
        }


        let product = new Product( fields );

        if ( files.photo && files.photo.path )
        {
            if ( files.photo.size > 1000000 )
            {
                return res.status( 400 ).json( {
                    error: "Image should be less than 1mb in size"
                } );
            }
            product.photo.data = fs.readFileSync( files.photo.path );
            product.photo.contentType = files.photo.type;
        }

        product.save()
            .then( ( result ) =>
            {
                res.json( result );
            } )
            .catch( ( err ) =>
            {
                console.error( err );
                return res.status( 400 ).json( {
                    error: errorHandler( err ),
                } );
            } );
    } );
};





exports.update = ( req, res ) =>
{
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, ( err, fields, files ) =>
    {
        if ( err )
        {
            console.error( err );
            return res.status( 400 ).json( {
                error: 'Form parsing error',
            } );
        }
        console.log( fields );


        let product = req.product;
        product = _.extend( product, fields );

        if ( files.photo && files.photo.path )
        {
            if ( files.photo.size > 1000000 )
            {
                return res.status( 400 ).json( {
                    error: "Image should be less than 1mb in size"
                } );
            }
            product.photo.data = fs.readFileSync( files.photo.path );
            product.photo.contentType = files.photo.type;
        }

        product.save()
            .then( ( result ) =>
            {
                res.json( result );
            } )
            .catch( ( err ) =>
            {
                console.error( err );
                return res.status( 400 ).json( {
                    error: errorHandler( err ),
                } );
            } );
    } );
};





exports.remove = ( req, res ) =>
{
    let product = req.product;
    product.deleteOne()
        .then( ( deletedProduct ) =>
        {
            res.json( {
                message: "Product deleted successfully"
            } );
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: errorHandler( err )
            } );
        } );
};


/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */



exports.list = ( req, res ) =>
{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt( req.query.limit ) : 6;

    Product.find()
        .select( "-photo" )
        .populate( 'category' )
        .sort( [ [ sortBy, order ] ] )
        .limit( limit )
        .then( ( products ) =>
        {
            if ( !products )
            {
                return res.status( 400 ).json( {
                    error: 'Products not found'
                } );
            }
            else
            {
                res.json( products );
            }
        } );

};


/**
 * it will find the product based on the req product category
 * other products that has same category, will be returned
 */

exports.listRelated = ( req, res ) =>
{
    let limit = req.query.limit ? parseInt( req.query.limit ) : 6;

    Product.find( { _id: { $ne: req.product }, category: req.product.category } )
        .limit( limit )
        .populate( 'category', '_id name' )
        .then( ( products ) =>
        {
            if ( !products )
            {
                return res.status( 400 ).json( {
                    error: 'Products not found'
                } );
            }
            else
            {
                res.json( products );
            }
        } );
};



exports.listCategories = ( req, res ) =>
{
    Product.distinct( "category", {} )
        .then( ( categories ) =>
        {
            if ( !categories )
            {
                return res.status( 400 ).json( {
                    error: 'Categories not found'
                } );
            } else
            {
                res.json( categories );
            }
        } );
};




/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = ( req, res ) =>
{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt( req.body.limit ) : 100;
    let skip = parseInt( req.body.skip );
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for ( let key in req.body.filters )
    {
        if ( req.body.filters[ key ].length > 0 )
        {
            if ( key === "price" )
            {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[ key ] = {
                    $gte: req.body.filters[ key ][ 0 ],
                    $lte: req.body.filters[ key ][ 1 ]
                };
            } else
            {
                findArgs[ key ] = req.body.filters[ key ];
            }
        }
    }

    Product.find( findArgs )
        .select( "-photo" )
        .populate( "category" )
        .sort( [ [ sortBy, order ] ] )
        .skip( skip )
        .limit( limit )
        .then( ( data ) =>
        {
            if ( !data )
            {
                return res.status( 400 ).json( {
                    error: "Products not found"
                } );
            }
            else
            {
                res.json( {
                    size: data.length,
                    data
                } );
            }
        } );
};


exports.photo = ( req, res, next ) =>
{
    if ( req.product.photo.data )
    {
        res.set( "Content-Type", req.product.photo.contentType );
        return res.send( req.product.photo.data );
    }
    next();
};


exports.listSearch = ( req, res ) =>
{
    const query = {};

    if ( req.query.search )
    {
        query.name = { $regex: req.query.search, $options: 'i' };

        if ( req.query.category && req.query.category !== 'All' )
        {
            query.category = req.query.category;
        }

        Product.find( query )
            .select( "-photo" )
            .then( ( products ) =>
            {
                res.json( products );
            } )
            .catch( ( err ) =>
            {
                console.log( err )
            } );
    }
};



exports.decreaseQuantity = ( req, res, next ) =>
{
    let bulkOps = req.body.order.products.map( ( item ) =>
    {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    } )

    Product.bulkWrite( bulkOps, {} )
        .then( ( product ) =>
        {
            next();
        } )
        .catch( ( err ) =>
        {
            return res.status( 400 ).json( {
                error: "Could not update product"
            } );
        } );
};