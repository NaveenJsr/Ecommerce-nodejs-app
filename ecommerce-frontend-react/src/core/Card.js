import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ( {
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showReamoveProductButton = false
} ) =>
{
    const [ redirect, setRedirect ] = useState( false )
    const [ count, setCount ] = useState( product.count )

    const showViewButton = ( showViewProductButton ) =>
    {
        return (
            showViewProductButton && (
                <Link to={ `/product/${ product._id }` }>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Product
                    </button>
                </Link >
            )
        )
    }

    const addToCart = () =>
    {
        addItem( product, () =>
        {
            setRedirect( true )
        } )
    }

    const shouldRedirect = redirect =>
    {
        if ( redirect )
        {
            return <Navigate to="/cart" />
        }
    }



    const showAddToCart = ( showAddToCartButton ) =>
    {
        return (
            showAddToCartButton && (
                <button onClick={ addToCart } className="btn btn-outline-warning mt-2 mb-2">
                    Add to Cart
                </button>
            )
        )
    }


    const showRemoveButton = ( showReamoveProductButton ) =>
    {
        return (
            showReamoveProductButton && (
                <button onClick={ () => removeItem( product._id ) } className="btn btn-outline-danger mt-2 mb-2">
                    Remeve Product
                </button>
            )
        )
    }

    const showStock = ( quantity ) =>
    {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-warning badge-pill">Out of Stock</span>
        )
    }

    const handleChange = productId => event =>
    {
        setCount( event.target.value < 1 ? 1 : event.target.value )
        if ( event.target.value >= 1 )
        {
            updateItem( productId, event.target.value )
        }
    }

    const showCartUpdateOptions = ( cartUpdate ) =>
    {
        return (
            cartUpdate && (
                <div className="input-group mb3">
                    <div className="input-group-prepend">
                        <span className="input-group-text mt-2">
                            Adjust Quantity
                        </span>
                    </div>
                    <input
                        type="number"
                        className="form-control mt-2"
                        value={ count }
                        onChange={ handleChange( product._id ) }
                    />
                </div>
            )
        )
    }

    const showBestSheller = ( sold ) =>
    {
        return (
            sold > 2 && (
                <span className="badge badge-warning badge-pill">Best Seller</span>
            )
        )
    }



    return (

        <div className="card mt-2">
            <div className="card-header name">{ product.name }</div>
            <div className="card-body">
                { shouldRedirect( redirect ) }
                <ShowImage item={ product } url="product" />
                <p className="lead mt-2"> { product.description.substring( 0, 50 ) } </p>
                <p className="black-10">Rs. { product.price }/-</p>
                <p className="black-9">Category: { product.category && product.category.name }</p>
                <p className="black-8">
                    Added on { moment( product.createdAt ).fromNow() }
                </p>

                { showStock( product.quantity ) }
                { showBestSheller( product.sold ) }<br />
                { showCartUpdateOptions( cartUpdate ) }
                { showViewButton( showViewProductButton ) }
                { showAddToCart( showAddToCartButton ) }
                { showRemoveButton( showReamoveProductButton ) }

            </div>
        </div >

    )
}


export default Card