import React, { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd';
import { useDispatch, useSelector, } from 'react-redux';
import { getProducts, deleteProduct, editProduct, deleteSelectData } from '../../../slice/productSlice';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllcate } from '../../../slice/categorySlice';
import { getAllcategory, getCategoryProduct } from '../../../api/categoty';
import { Cate, filterCate } from '../../../main';
import axios from 'axios';
import { deleteMultipleProduct, getAllProduct } from '../../../api/product';
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

const ProductAdmin = ({ product }) => {
    const [state, setCate] = useState([]);
    const [search, searchState] = useState("");
    const [filter, setFilter] = useState("");


    const [checkedId, setCheckedId] = useState([]);
    const [checkAllid, setCheckAllid] = useState(false);
    console.log("checkAllid", checkAllid);
    const dispath = useDispatch();
    useEffect(() => {
        const dataCate = async () => {
            setCate(await Cate());
        }
        dataCate();

        dispath(getProducts());

    }, [])

    let dataS = product;
    (search.length) ? dataS = product.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : "";
    if (filter.length) {
        dataS = product.filter(item => (filter == item.category));
        (filter == "all") ? product.map((item) => dataS.push(item)) : ""
    }

    const hanedleCheckboxChange = id => {
        if (checkedId.includes(id)) {
            setCheckedId(checkedId.filter(itemId => itemId !== id));
        } else {
            setCheckedId([...checkedId, id]);
        }
    }

    const handleCheckAll = () => {
        setCheckAllid(!checkAllid); //nếu mà bằng true
        if (!checkAllid) {
            setCheckedId(product.map((item) => item._id))
        } else {
            setCheckedId([]);
        }
    }
    //bấm để cút
    const hanedleDeleteData = async () => {
        dispath(deleteSelectData(checkedId)); //xóa theo mảng
        // setCheckAllid([]); //xóa xong thì về 1 mảng rỗng
        await deleteMultipleProduct(checkedId);
    }

    const data = dataS ? dataS.map((value, index) => {
        return {
            key: value._id,
            all: <div>
                <input class="form-check-input"
                    checked={checkedId.includes(value._id)}
                    onChange={() => hanedleCheckboxChange(value._id)
                    }
                    type="checkbox" id="defaultCheck1" />
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
            <input type="checkbox"
                checked={checkAllid} name=""
                onChange={() => handleCheckAll()
                    // let { checked } = e.target;
                    // setCheck(e.target.checked);
                    // setProductState(
                    //     dataS.map(item => {

                    //         item.select = checked;
                    //         return item;
                    //     })

                    // )
                } id="" />
            <button className='btn btn-danger' onClick={() => { hanedleDeleteData() }}>Cút</button>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px" }}>Add Product</Button>
            </NavLink>
            <NavLink to={'/admin/product/creacting'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Add Multiple</Button>
            </NavLink>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
            </NavLink>
            <select className="form-select-sm" onChange={e => setFilter(e.target.value)} style={{ border: "none", padding: "10px", outline: "none" }} aria-label=".form-select-sm example">
                <option value={"all"}>Open this select menu</option>
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