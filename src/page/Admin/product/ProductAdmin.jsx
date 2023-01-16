import React, { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd';
import { useDispatch, useSelector, } from 'react-redux';
import { getProducts, deleteProduct, editProduct } from '../../../slice/productSlice';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllcate } from '../../../slice/categorySlice';
import { getAllcategory, getCategoryProduct } from '../../../api/categoty';
import { Cate, filterCate } from '../../../main';
import axios from 'axios';
const columns = [
    {
        title: "Select",
        key: "all",
        dataIndex: 'all'
    },

    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Image',
        key: 'image',
        dataIndex: 'image',
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
    },
    {
        title: 'Delete',
        key: 'delete',
        dataIndex: 'delete',
    },
    {
        title: 'Edit',
        key: 'edit',
        dataIndex: 'edit',
    },

];

const ProductAdmin = () => {
    const product = useSelector(state => state.product.value);
    const dispath = useDispatch();
    const [state, setCate] = useState([]);
    const [search, searchState] = useState("");
    const [filter, setFilter] = useState("");
    useEffect(() => {
        const dataCate = async () => {
            setCate(await Cate());
        }
        dataCate();
      
    }, [])
    useEffect(() => {
        dispath(getProducts());
    }, []);
    let dataS = product;
    (search.length) ? dataS = product.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : ""
    if (filter.length) {
        dataS = product.filter(item => (filter == item.category)),
        (filter == "all") ? product.map((item) => dataS.push(item)) : ""
    }
    const data = dataS ? dataS.map((value, index) => {
        return {
            key: value._id,
            all: <div>
                <input class="form-check-input" onChange={(e) => {
                    var check = e.target.checked
                    if (value._id) {
                        check = true
                    }
                    return check;
                }} checked={value.select} type="checkbox" value="" id="defaultCheck1" />
            </div>,
            name: value.name,
            price: value.price,
            description: value.descriptions,
            category: filterCate(state, value.category),
            image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={value.image} />,
            delete: <Button
                type="primary"
                onClick={() => toast.success(`Delete ${value.name} Success!`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }, dispath(deleteProduct(value._id)))}
            >Delete</Button>,
            edit: <NavLink to={`/admin/product/edit/${value._id}`}>
                <Button
                    type="primary" danger
                >Edit</Button>
            </NavLink>
        }
    }) : "";
    return (
        <>
            <button type="button" className="btn btn-light" onClick={() => getcheck()} style={{ boxShadow: "0 0 3px #999" }}>Tất cả</button>
            <button className='btn'>Thùng rác</button>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px" }}>Add Product</Button>
            </NavLink>
            <NavLink to={'/admin/product/creacting'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Import Excel</Button>
            </NavLink>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
            </NavLink>
            <select className="form-select-sm" onChange={e => setFilter(e.target.value)} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
                <option selected value={"all"}>Open this select menu</option>
                {state.map((item, index) => {
                    return <option value={item._id} key={index} >{item.name}</option>
                })}
            </select>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" danger shape="round" style={{ display: "inline-block  ", margin: "10px 10px" }}>Export Excel</Button>
            </NavLink>
            <div style={{ display: "inline-block" }}>
                <div className="input-group">
                    <div className="form-outline">
                        <input type="search" id="form1" placeholder='search...' className="form-control" onChange={e => {
                            searchState(e.target.value);
                        }} />
                    </div>
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
        </>
    )
}

export default ProductAdmin