import React, { memo, useContext, useEffect, useState } from "react";
import { Spin, Dropdown, Select, Input, message } from "antd";
import {
  getProducts,
  deleteProduct,
  autoGenarateEpisodeMovieSlice,
} from "../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import {
  approvedMultipleMovies,
  approveProduct,
  cancelApproveProduct,
  clearCacheProducts,
  clearCacheRedis,
  deleteMultipleProduct,
  endcodeMutipleDailymotionServer,
} from "../../../sevices/product";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { MyButton } from "../../../components/MV/Button";
import {
  Eye,
  Edit,
  Trash2,
  ArrowUp,
  XCircle,
  Send,
  Calendar,
  Globe,
  Film,
  PlayCircle,
  Check,
  MoreVertical,
  Star,
  Plus,
  LinkIcon,
  CirclePlus,
  Pencil,
} from "lucide-react";
import MVConfirm from "../../../components/MV/Confirm";
import MVLink from "../../../components/Location/Link";
import { MyContext } from "../../../context";
import PageTitle from "../../../components/PageTitle";
import ProductTable from "./ui/ProductTable";
import ProductHeader from "./ui/ProductHeader";
import ProductDrawer from "./ui/ProductDrawer";
import "./style.css";

const ProductAdmin = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [episodeSearch, setEpisodeSearch] = useState("");
  const products = useAppSelector((state) => state.product.value);
  const isLoading: any = useAppSelector((state) => state.product.isLoading);
  const [page, setPage] = useState(1);
  const cate: any = useAppSelector((state) => state.category.category);
  const [open, setOpen] = useState(false);
  const { user }: any = useContext(MyContext);
  const [init, setInit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts({ page, categoryId: selectedCategory, seri: episodeSearch }));
  }, [page, selectedCategory, episodeSearch, init]);


  const handleCategoryFilter = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };


  const handleEpisodeSearch = (value: string) => {
    setEpisodeSearch(value);
    setPage(1);
  };


  const handlePageChangePage = (value) => {
    setPage(value);
    dispatch(getProducts(value));
  };

  const handleDeleteSelectedData = async () => {
    const response: any = await deleteMultipleProduct(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Delete products successfully");
    } else {
      toast.error("Error deleting products");
    }
  };

  const handleApprovedMultipleMovies = async () => {
    const response: any = await approvedMultipleMovies(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Approved Products Successfully");
    } else {
      toast.error("Error deleting products");
    }
  };

  const handleEditEncodeMutipleDailymotionServer = async () => {
    const response: any = await endcodeMutipleDailymotionServer(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success("Edit Products Successfully");
    } else {
      toast.error("Error deleting products");
    }
  };

  const confirm = async (id) => {
    const response = await dispatch(deleteProduct(id));
    if (response.payload.success) {
      toast.success("Delete product successfully");
    } else {
      toast.error("Error deleting product");
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleApproved = async (id: any) => {
    const response = await approveProduct(id);
    if (response.data.success == true) {
      toast.success(response.data.message);
      setInit(!init);
    } else {
      toast.error("Error!");
    }
  };

  const cancelHandleApproved = async (id: any) => {
    const response = await cancelApproveProduct(id);
    if (response.data.success == true) {
      toast.success(response.data.message);
      setInit(!init);
    } else {
      toast.error("Error!");
    }
  };

  const handleClearCache = async () => {
    const res = await clearCacheProducts();
    if (res.data.suscess == true) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleClearCacheRedis = async () => {
    const res = await clearCacheRedis();
    if (res?.data?.success == true) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleAutoRenderEpisodeMovie = async () => {
    const res = await dispatch(autoGenarateEpisodeMovieSlice());
    if (res.meta.requestStatus == "fulfilled") {
      setInit(!init);
      setOpen(false);
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };


  const columnsProduct = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text: string) => (
        <span className="truncate text-start">{text}</span>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 200,
      render: (text: string) => (
        <span className="truncate text-start block">{text}</span>
      ),
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: 150,
      render: (text: string) => (
        <span className="truncate text-start block">{text}</span>
      ),
    },
    {
      title: "Seri",
      key: "seri",
      dataIndex: "seri",
      width: 50,
      render: (text: string) => (
        <span className="truncate max-w-[80px] block">{text}</span>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: 50,
      render: (text: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: "Thuyet Minh",
      dataIndex: "thuyetMinh",
      key: "thuyetMinh",
      width: 50,
      render: (text: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 80,
      fixed: "right",
      render: (_: any, record: any) => {
        const getMenuItems = () => {
          switch (user?.role) {
            case 0:
              return [
                {
                  key: 'view',
                  label: (
                    <MVLink to={"/"}>
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>View</span>
                      </div>
                    </MVLink>
                  ),
                },
              ];
            case 1:
              return [
                {
                  key: 'view',
                  label: (
                    <MVLink to={"/"}>
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>View</span>
                      </div>
                    </MVLink>
                  ),
                },
                {
                  key: 'edit',
                  label: (
                    <MVLink to={`/dashboard/product/edit/${record.slug}`}>
                      <div className="flex items-center gap-2">
                        <Edit size={16} />
                        <span>Edit</span>
                      </div>
                    </MVLink>
                  ),
                },
              ];
            case 2:
              return [
                {
                  key: 'Copy Link',
                  label: (
                    <button
                      onClick={() => {
                        const link = `https://hh3dtq.site/xem-phim/${record.slug}`;
                        navigator.clipboard.writeText(link)
                          .then(() => {
                            message.success('Copy link successfully');
                          })
                          .catch((err) => {
                            console.error("Copy failed:", err);
                          });
                      }}
                      className="flex items-center gap-2"
                    >
                      <LinkIcon size={16} />
                      <span>Copy Link</span>
                    </button>
                  ),
                },
                {
                  key: 'edit',
                  label: (
                    <MVLink to={`/dashboard/product/edit/${record.slug}`}>
                      <div className="flex items-center gap-2">
                        <Edit size={16} />
                        <span>Edit</span>
                      </div>
                    </MVLink>
                  ),
                },

                {
                  key: 'delete',
                  label: (
                    <MVConfirm
                      title="Delete the product"
                      onConfirm={() => confirm(record.key)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div className="flex items-center gap-2">
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </div>
                    </MVConfirm>
                  ),
                },
                {
                  key: 'move-up',
                  label: (
                    <div className="flex items-center gap-2">
                      <ArrowUp size={16} />
                      <span>Move Up</span>
                    </div>
                  ),
                },
                {
                  key: 'edit-voice-over',
                  label: (
                    <MVLink to={`/dashboard/product/edit-voice-over/${record.slug}`}>
                      <div className="flex items-center gap-2">
                        <Edit size={16} />
                        <span>Edit Voice Over</span>
                      </div>
                    </MVLink>
                  ),
                },
                {
                  key: 'Add Thumnail Episode',
                  label: (
                    <MVLink to={`/dashboard/product/${record._id}/thumbnail/add`}>
                      <div className="flex items-center gap-2">
                        <CirclePlus size={16} />
                        <span>Add Thumnail Episode</span>
                      </div>
                    </MVLink>
                  ),
                },
                {
                  key: 'Edit Thumnail Episode',
                  label: (
                    <MVLink to={`/dashboard/product/${record._id}/thumbnail/edit`}>
                      <div className="flex items-center gap-2">
                        <Pencil size={16} />
                        <span>Edit Thumnail Episode</span>
                      </div>
                    </MVLink>
                  ),
                },
                ...(record?.isApproved
                  ? [
                    {
                      key: 'approved',
                      label: (
                        <div className="flex items-center gap-2">
                          <Check size={16} />
                          <span>Approved</span>
                        </div>
                      ),
                      disabled: true,
                    },
                    {
                      key: 'cancel-approval',
                      label: (
                        <div
                          className="flex items-center gap-2"
                          onClick={() => cancelHandleApproved(record.key)}
                        >
                          <XCircle size={16} />
                          <span>Cancel Approval</span>
                        </div>
                      ),
                    },
                  ]
                  : [
                    {
                      key: 'approve',
                      label: (
                        <div
                          className="flex items-center gap-2"
                          onClick={() => handleApproved(record.key)}
                        >
                          <Send size={16} />
                          <span>Approve</span>
                        </div>
                      ),
                    },
                  ]),
              ];
            default:
              return [];
          }
        };

        return (
          <Dropdown
            menu={{
              items: getMenuItems(),
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <MyButton type="text" shape="circle" className="hover:bg-gray-100">
              <MoreVertical size={16} />
            </MyButton>
          </Dropdown>
        );
      },
    },
  ];

  const data =
    products?.data &&
    products?.data.map((value: any) => {
      return {
        _id: value._id,
        key: value._id,
        name: (
          <div className="flex flex-col">
            <span className="font-medium text-gray-800 text-sm">{value.name}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              {new Date(value.createdAt).toLocaleDateString()}
            </span>
          </div>
        ),
        slug: value.slug,
        trailer: value.trailer ? (
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
            <PlayCircle className="w-3 h-3" />
            Has Trailer
          </span>
        ) : (
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
            <Film className="w-3 h-3" />
            No Trailer
          </span>
        ),
        category: (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-800 text-sm">{value?.category?.name}</span>
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
                <Globe className="w-2.5 h-2.5" />
                {value?.category?.lang}
              </span>
              <span className="px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                <Star className="w-2.5 h-2.5" />
                {value?.category?.quality}
              </span>
            </div>
          </div>
        ),
        view: (
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800 text-sm">{value?.view}</span>
          </div>
        ),
        seri: (
          <div className="flex items-center justify-center  text-blue-700 rounded-full font-medium text-sm">
            {value?.seri}
          </div>
        ),
        isActive: value.server2 || value.dailyMotionServer ? (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-green-700 font-medium text-sm">Active</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <span className="text-red-700 font-medium text-sm">Inactive</span>
          </div>
        ),
        thuyetMinh: value.voiceOverLink ? (
          <div className="flex items-center gap-1">
            <Check size={16} />
            <span className="text-green-700 font-medium text-sm">Yes</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <XCircle size={16} />
            <span className="text-red-700 font-medium text-sm">No</span>
          </div>
        ),
        isApproved: value.isApproved,
        idCategory: value.category,
        option: [<MyButton>Add Option</MyButton>],
      };
    });

  return (
    <>
      <PageTitle title="" subtitle="Movie Episode" />

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Select
          style={{ width: 240 }}
          placeholder="Chọn danh mục để lọc"
          allowClear
          value={selectedCategory || undefined}
          onChange={handleCategoryFilter}
          options={cate?.data?.map((item: any) => ({
            label: item.name,
            value: item._id,
          }))}
        />
        <Input.Search
          style={{ width: 240 }}
          placeholder="Tìm kiếm tập phim (episode)"
          allowClear
          onSearch={handleEpisodeSearch}
          onChange={(e) => {
            if (!e.target.value) {
              handleEpisodeSearch("");
            }
          }}
        />
      </div>

      <ProductHeader
        onOpenDrawer={showDrawer}
        onGenerateEpisode={handleAutoRenderEpisodeMovie}
      />

      <ProductDrawer
        open={open}
        onClose={onClose}
        onDeleteSelected={handleDeleteSelectedData}
        onApproveMultiple={handleApprovedMultipleMovies}
        onEditMultiple={handleEditEncodeMutipleDailymotionServer}
        onClearCache={handleClearCache}
        onClearCacheRedis={handleClearCacheRedis}
        categories={cate?.data}
      />

      <Spin spinning={isLoading} delay={undefined}>
        <ProductTable
          data={data}
          columns={columnsProduct}
          rowSelection={rowSelection}
          isLoading={isLoading}
          page={page}
          total={products?.totalCount}
          onPageChange={handlePageChangePage}
        />
      </Spin>
    </>
  );
});

export default ProductAdmin;
