import React, { useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd';
import { getProducts, deleteProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cate, filterCate } from '../../../function';
import { deleteMultipleProduct } from '../../../api/product';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
declare var Promise: any;
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const columns = [
    {
        title: "Select",
        key: "all",
        dataIndex: 'all',
        showOnResponse: true,
        showOnDesktop: true
    },
    {
        title: 'Id',
        dataIndex: '_id',
        key: '_id',
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
        title: 'Trailer',
        dataIndex: 'trailer',
        key: 'trailer',
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
    const [checkedId, setCheckedId]: any = useState([]);
    const [checkAllid, setCheckAllid] = useState(false);
    const [init, setInit] = useState(false);

    const dispath = useAppDispatch();
    useEffect(() => {
        const dataCate = async (): Promise<any> => {
            setCate(await Cate());
        }
        dataCate();

        dispath(getProducts());
        document.title = "Admin Page";
    }, [init])

    let dataS = product;
    (search.length) ? dataS = product.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : "";
    if (filter.length) {
        dataS = product.filter((item: any) => (filter == item.category));
        (filter == "all") ? product.map((item: any) => dataS.push(item)) : ""
    }

    const hanedleCheckboxChange = (id: any) => {
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
        // dispath(deleteMultipleData(checkedId)) //xóa theo mảng
        // setCheckAllid([]); //xóa xong thì về 1 mảng rỗng
        // await deleteMultipleProduct(checkedId);
        const text = 'Mày có muốn xóa không ?'
        if (window.confirm(checkedId) == true) {
            setInit(true);
            toast.success('Xóa tất cả thành công');
            return await deleteMultipleProduct(checkedId);;
        } else {
            return "";
        }
    }

    const data = dataS ? dataS.map((value: any, index: any) => {

        return {
            key: value._id,
            all: <Divstyled>
                <InputStyled className="form-check-input"
                    checked={checkedId.includes(value._id)}
                    onChange={() => hanedleCheckboxChange(value._id)}
                    type="checkbox" id="defaultCheck1"
                />
            </Divstyled>,
            // _id: value._id,
            name: value.name,
            price: value.price,
            category: state.map((item: any) => {
                if (item._id === value.category)
                    return item.name
            }),
            image: <Image width={150} height={200} style={{ objectFit: "cover" }}
                src={
                    value.image ? value.image : "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54"
                } />,
            Seri: value.seri,
            copyright: value.copyright,
            trailer: value.trailer ? "true" : "false",
            delete: <Button style={{ background: "#1677ff" }}
                type="primary"
                onClick={() => {
                    dispath(deleteProduct(value._id));
                    toast.success('delete product successfully');
                }}
            >Delete</Button>,
            edit: <Link to={`/admin/product/edit/${value._id}`}>
                <Button
                    type="primary" danger
                >Edit</Button>
            </Link>
        }
    }) : "";

    return (
        <>
            <InputStyled type="checkbox"
                checked={checkAllid} name=""
                onChange={() => handleCheckAll()}
                id=""
            />
            <BtnStyled onClick={() => { handleDeleteData() }} className='btn_remove'>
                <i className="fa-solid fa-trash text-light"></i>
            </BtnStyled>
            <Link to={'/admin/product/add'}  >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#1677ff" }}>Add Product</Button>
            </Link>
            <Link to={'/admin/product/creacting'} >
                <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Add Multiple</Button>
            </Link>
            <Link to={'/admin/product/add'} >
                <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
            </Link>
            <select className="form-select-sm" onChange={e => setFilter(e.target.value)} style={{ border: "none", padding: "10px", outline: "none", width: "250px" }} aria-label=".form-select-sm example">
                <option value={"all"}>Open this select menu</option>
                {state.map((item, index) => {
                    return <option value={item._id} key={index} >{item.name}</option>
                })}
            </select>
            <Link to={'/admin/product/add'} >
                <Button type="primary" danger shape="round" style={{ display: "inline-block  ", margin: "10px 10px" }}>Export Excel</Button>
            </Link>
            <Divstyled style={{ display: "inline-block" }}>
                <Divstyled className="input-group">
                    <Divstyled className="form-outline">
                        <InputStyled type="search" id="form1" placeholder='search...' className="form-control" onChange={e => {
                            searchState(e.target.value);
                        }} />
                    </Divstyled>
                </Divstyled>
            </Divstyled>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
        </>
    )
}

export default ProductAdmin