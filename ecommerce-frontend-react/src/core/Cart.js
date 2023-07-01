import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Card from "./Card";
import { getCart } from "./cartHelpers";
import Checkout from "./Checkout";


const Cart = () =>
{
    const [ items, setItems ] = useState( [] )

    useEffect( () =>
    {
        setItems( getCart() )
    }, [ items ] )

    const showItems = ( items ) =>
    {
        return (
            <div>
                <h3>Your cart has { `${ items.length }` }</h3>
                <hr />
                <div className="row">
                    { items.map( ( product, i ) => (
                        <div key={ i } className="col-6 mb-3">
                            <Card
                                product={ product }
                                showAddToCartButton={ false }
                                cartUpdate={ true }
                                showReamoveProductButton={ true }
                            />
                        </div>
                    ) ) }
                </div>
            </div>
        )
    }

    const noItemMessage = () =>
    (
        <h2>Your cart is empty. <br /><Link to="/shop">Continue shopping</Link></h2>
    )

    return (

        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">
                    { items.length > 0 ? showItems( items ) : noItemMessage() }
                </div>

                <div className="col-6">
                    <h3 className="mb-2">Your cart summary</h3>
                    <hr />
                    <Checkout products={ items } />
                </div>
            </div>
        </Layout>
    )
}

export default Cart