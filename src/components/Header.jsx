import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className="masthead mb-auto">
            <div className="inner" >
                <h3 className="masthead-brand" style={{ textAlign: "center", background: "", color: "#fff" }}>Cover</h3>
                <nav className="nav nav-masthead justify-content-center">
                    <li className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/'}>Home</Link></li>
                    <li className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/product'}>Trailer</Link></li>
                    <li className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/auth/signin'}>Signin</Link></li>
                    <li className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/auth/signup'}>Signup</Link></li>
                    <li className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/auth/profile'}>Profile</Link></li>
                </nav>
                <div className="form-outline">
                    <input type="search" id="form1" placeholder='search...' className="form-control" />
                </div>
            </div>
        </header>
    );
}
export default Header