import React, { useState, useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom';
import { Cate } from '../main';
const Header = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getDta = async () => {
            setCategory(await Cate());
        }
        getDta();
    },[]);
    return (
        <header class="masthead mb-auto">
            <div class="inner " >
                <h3 class="masthead-brand" style={{ textAlign: "center", background: "#333", color: "#fff" }}>Cover</h3>
                <nav class="nav nav-masthead justify-content-center">
                    <li class="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/'}>Home</Link></li>
                    <li class="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/product'}>Products</Link></li>
                    <li class="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/signin'}>Signin</Link></li>
                    <li class="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/signup'}>Signup</Link></li>
                    <li class="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={'/profile'}>Profile</Link></li>
                </nav>
            </div>
            <div className="nav-scroller py-1 mb-2 mt-5 " >
                <nav className="nav d-flex justify-content-around" style={{ background: "#fff" }}>
                    {category.map((item, index) => {
                        return <NavLink className={"p-2"} key={index}
                            style={{ textDecoration: "none", color: "#333" }} to={'/product/category/' + item._id + `?category=${item.name}`}>{item.name}
                        </NavLink>
                    })}
                </nav>
            </div>
        </header>
    );
}
export default Header