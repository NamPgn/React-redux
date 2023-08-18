import React, { useContext, useEffect, useState } from 'react'
import { Table, Image } from 'antd';
import { getProducts, deleteProduct } from '../../../redux/slice/product/ThunkProduct/product';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteMultipleProduct } from '../../../api/product';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hook';
import type { ColumnsType } from 'antd/es/table';
import { MyContext } from '../../../context';
import { MyButton } from '../../../components/Button';
import MySelect from '../../../components/Select';
const Divstyled = styled.div``;
const InputStyled = styled.input``;
const columns: ColumnsType<any> = [
    {
        title: "Select",
        key: "all",
        dataIndex: 'all',
        width: 100,
        fixed: 'left',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    // {
    //     title: 'Image',
    //     key: 'image',
    //     dataIndex: 'image',
    // },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
    },
    {
        title: 'Seri',
        key: 'Seri',
        dataIndex: 'Seri',
        width: 100,
    },
    {
        title: 'Copyright',
        key: 'copyright',
        dataIndex: 'copyright',
        width: 100,
    },
    {
        title: 'Trailer',
        dataIndex: 'trailer',
        key: 'trailer',
        width: 100,
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        width: 100,
    },
    {
        title: 'Options',
        dataIndex: 'options',
        key: 'options',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        width: 100,
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        width: 180,
        fixed: 'right',
    },
];

const ProductAdmin = ({ product, length }) => {
    const { category }: any = useContext(MyContext);
    const [search, searchState] = useState("");
    const [filter, setFilter] = useState("");
    const [checkedId, setCheckedId]: any = useState([]);
    const [checkAllid, setCheckAllid] = useState(false);
    const [init, setInit] = useState(false);
    const [page, setPage] = useState(1);
    const dispath = useAppDispatch();
    useEffect(() => {
        dispath(getProducts(page));
        document.title = "Admin Page";
    }, [init, page])

    let dataS = product;
    (search.length) ? dataS = product.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : "";
    if (filter) {
        dataS = product.filter((item: any) => (filter == item.category));
        (filter == "Select") ? product.map((item: any) => dataS.push(item)) : ""
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
            await deleteMultipleProduct(checkedId);;
        }
    }


    const handleDelete = async (id) => {
        const response = await dispath(deleteProduct(id));
        if (response.payload.success) {
            toast.success('Delete product successfully');
        } else {
            toast.error('Error deleting product');
        }
    }

    const handleChangeSelect = (value: any) => {
        setFilter(value); //lọc
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
            trailer: value.trailer ? "true" : "false",
            category: category && (category.data.map((item: any) => {
                if (item._id === value.category) return item.name
            })),
            // image: <Image width={150} height={200} style={{ objectFit: "cover" }}
            //     src={
            //         value.image ? value.image : "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54"
            //     } />,
            Seri: value.seri,
            copyright: value.copyright,
            options: value.options,
            country: value.country ? value.country : "null",
            year: value.year ? value.year : "null",
            action: (
                <>
                    <Link to={`/admin/product/edit/${value._id}`}>
                        <MyButton danger >Edit</MyButton>
                    </Link>
                    <MyButton type="primary" onClick={() => handleDelete(value._id)}
                    >Delete</MyButton>
                </>
            )
        }
    }) : "";
    return (
        <>
            <InputStyled
                type="checkbox"
                className="mr-2"
                checked={checkAllid} name=""
                onChange={() => handleCheckAll()}
            />
            <MyButton
                onClick={() => { handleDeleteData() }}
            >Xóa
            </MyButton>
            <Link to={'/admin/product/add'}  >
                <MyButton style={{ display: "inline-block", margin: "10px 10px", background: "#1677ff" }}>Add Product</MyButton>
            </Link>
            <Link to={'/admin/product/creacting'} >
                <MyButton style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Add Multiple</MyButton>
            </Link>
            <Link to={'/admin/product/add'} >
                <MyButton style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</MyButton>
            </Link>
            <Link to={'/admin/product/add'} >
                <MyButton danger shape="round" style={{ display: "inline-block  ", margin: "10px 10px" }}>Export Excel</MyButton>
            </Link>
            <MySelect
                placeholder={'Select'}
                onChange={handleChangeSelect}
                defaultValue={'Select'}
                style={{ width: 300 }}
                options={category && (category?.data.map((item, index) => ({
                    label: item.name,
                    value: item._id
                })))}
                children={undefined}
            />
            <Divstyled style={{ display: "inline-block" }}>
                <Divstyled className="input-group ml-2">
                    <Divstyled className="form-outline">
                        <InputStyled type="search" id="form1" placeholder='search...' className="form-control p-3 rounded" onChange={e => {
                            searchState(e.target.value);
                        }} />
                    </Divstyled>
                </Divstyled>
            </Divstyled>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 1500, y: 1000 }}
                pagination={{
                    defaultPageSize: 40,
                    showSizeChanger: true,
                    pageSizeOptions: ['40', '80', '120'],
                    current: page,
                    onChange: (value) => { setPage(value) },
                    total: length
                }}
            />
        </>
    )
}

export default ProductAdmin