import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser"
import moment from "moment";


const Dashboard = () =>
{

    const [ history, setHistory ] = useState( [] )

    const { user: { _id, name, email, role } } = isAuthenticated()
    const token = isAuthenticated().token


    const init = ( userId, token ) =>
    {
        getPurchaseHistory( userId, token )
            .then( data =>
            {
                if ( data.error )
                {
                    console.log( data.error );
                }
                else
                {
                    setHistory( data )
                }
            } )
    }

    useEffect( () =>
    {
        init( _id, token )
    }, [] )


    const userLinks = () =>
    {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>

                    <li className="list-group-item">
                        <Link className="nav-link" to={ `/profile/${ _id }` }>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }


    const userInfo = () =>
    {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item"> { name } </li>
                    <li className="list-group-item"> { email } </li>
                    <li className="list-group-item"> { role === 1 ? "Admin" : "Registered User" } </li>
                </ul>
            </div>
        )
    }


    const purchaseHistory = ( history ) =>
    {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        { history.map( ( h, i ) =>
                        {
                            return (
                                <div>
                                    { h.products.map( ( p, i ) =>
                                    {
                                        return (
                                            <div key={ i }>
                                                <h6><p className="black-7" style={ { padding: '5px' } } >Product name: { p.name }</p></h6>
                                                <p style={ { marginTop: '-10px' } }>Product price: { p.price }/-</p>
                                                <p style={ { marginTop: '-10px' } }>Purchase date: { moment( p.createdAt ).fromNow() }</p>
                                            </div>
                                        )
                                    } ) }
                                </div>
                            )
                        } ) }
                    </li>
                </ul>
            </div>
        )
    }


    return (
        <Layout
            title="Dashboard"
            description={ `G'day ${ name }!` }
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    { userLinks() }
                </div>
                <div className="col-9">
                    { userInfo() }
                    { purchaseHistory( history ) }
                </div>
            </div>
        </Layout>
    )
}


export default Dashboard;
