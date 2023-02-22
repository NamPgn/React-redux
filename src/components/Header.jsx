import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routerNavBar } from '../router';

const Header = () => {
    return (
        <header className="masthead mb-auto">
            <div className="inner fixed-top " style={{ background: "#000", boxShadow: "0 0 3px #fff" }} >
                <div className="masthead-brand-img">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiS05SSYFZN1vOU1PnNyovN8VYtpU6aqE9lDEIyL0_uoxBpABAhozyYXY5BNpJyWEOLy0f1Y2mRwBC_Q9r1jDZ0sbLhNhtV1093uQkDwZbVVyYyt642kf6PrX8ZiJnDL8k15XHb0p0rExzA3RhCaoXUBKjG6aWQ-DCYdohvnkf8_YFV4xBNW7A9gX0g/s902/Picture1.png" alt="logo" />
                    </Link>
                </div>
                <nav className="nav nav-masthead justify-content-center">
                    {routerNavBar.map((item, index) => (
                        <li key={index} className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                    ))}
                </nav>
                
                <div className="form-outline searchHeader">
                    <input type="search" id="form1" placeholder='search...' className="form-control" />
                </div>
            </div>
        </header>
    );
}
export default Header