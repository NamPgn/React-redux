import React, { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd';
import { useDispatch, useSelector, } from 'react-redux';
import { getProducts, deleteProduct, editProduct, deleteSelectData, } from '../../../redux/slice/productSlice';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllcate } from '../../../redux/slice/categorySlice';
import { getAllcategory, getCategoryProduct } from '../../../api/category';
import { Cate, filterCate } from '../../../main';
import axios from 'axios';
import { deleteMultipleProduct, getAllProduct } from '../../../api/product';
const columns = [
    {
        title: "Select",
        key: "all",
        dataIndex: 'all',
        showOnResponse: true,
        showOnDesktop: true
    },

    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Image',
        key: 'image',
        dataIndex: 'image',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Seri',
        key: 'Seri',
        dataIndex: 'Seri',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Copyright',
        key: 'copyright',
        dataIndex: 'copyright',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Delete',
        key: 'delete',
        dataIndex: 'delete',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Edit',
        key: 'edit',
        dataIndex: 'edit',
        showOnResponse: true,
        showOnDesktop: true
    },

];

const ProductAdmin = ({ product }) => {
    const [state, setCate] = useState([]);
    const [search, searchState] = useState("");
    const [filter, setFilter] = useState("");
    const [checkedId, setCheckedId] = useState([]);
    const [checkAllid, setCheckAllid] = useState(false);
    const [init, setInit] = useState(false);
    const dispath = useDispatch();
    useEffect(() => {
        const dataCate = async () => {
            setCate(await Cate());
        }
        dataCate();

        dispath(getProducts());

    }, [init])

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
    const handleDeleteData = async () => {
        console.log("checkAllid", checkedId);
        // dispath(deleteMultipleData(checkedId)) //xóa theo mảng
        // setCheckAllid([]); //xóa xong thì về 1 mảng rỗng
        // await deleteMultipleProduct(checkedId);
        const deleteId = await deleteMultipleProduct(checkedId);
        setInit(true);
        return deleteId;
    }

    const data = dataS ? dataS.map((value, index) => {
        return {
            key: value._id,
            all: <div>
                <input className="form-check-input"
                    checked={checkedId.includes(value._id)}
                    onChange={() => hanedleCheckboxChange(value._id)}
                    type="checkbox" id="defaultCheck1"
                />
            </div>,
            name: value.name,
            price: value.price,
            category: filterCate(state, value.category),
            image: <Image width={150} height={200} style={{ objectFit: "cover" }}
                src={ 
                    value.image ? value.image : "https://hoathinh3d.com/wp-content/uploads/2021/10/dau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856-300x450.jpg"
                } />,
            Seri: value.seri,
            copyright: value.copyright,
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
                onChange={() => handleCheckAll()}
                id=""
            />
            <button onClick={() => { handleDeleteData() }} className='btn_remove'>
                <i className="fa-solid fa-trash text-light"></i>
            </button>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px" }}>Add Product</Button>
            </NavLink>
            <NavLink to={'/admin/product/creacting'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Add Multiple</Button>
            </NavLink>
            <NavLink to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
            </NavLink>
            <select className="form-select-sm" onChange={e => setFilter(e.target.value)} style={{ border: "none", padding: "10px", outline: "none", width: "250px" }} aria-label=".form-select-sm example">
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
                </div>
            </div>
            <Table columns={columns} mobileBreakPoint={768} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
        </>
    )
}

export default ProductAdmin