import React, { memo, useContext, useEffect, useState } from "react";
import { Dropdown, message, Tag } from "antd";
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
import MVLink from "../../../components/Location/Link";
import { MyContext } from "../../../context";

import PageTitle from "../../../components/PageTitle";
import ProductTable from "./ui/ProductTable";
import ProductHeader from "./ui/ProductHeader";
import ProductDrawer from "./ui/ProductDrawer";
import EditVoiceOver from "./component/edit-voice-over";
import "./style.css";
import { Link } from "react-router-dom";
import ProductActions from "./ui/ProductActions";
import DeleteConfirmModal from "./component/deleteConfirmModal";

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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [editVoiceOverVisible, setEditVoiceOverVisible] = useState(false);
  const [selectedVoiceOverRecord, setSelectedVoiceOverRecord] = useState<any>(null);
  const [isGeneratingEpisode, setIsGeneratingEpisode] = useState(false);
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

  const handleDeleteClick = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRecord) {
      try {
        const response = await dispatch(deleteProduct(selectedRecord.key));
        if (response.payload?.success == true) {
          toast.success(response.payload?.message || "Xóa thành công");
          setInit(!init);
        } else {
          toast.error("Xóa thất bại");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra");
      }
      setIsDeleteModalVisible(false);
      setSelectedRecord(null);
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
    try {
      setIsGeneratingEpisode(true);
      const res = await dispatch(autoGenarateEpisodeMovieSlice());
      if (res.meta.requestStatus == "fulfilled") {
        setInit(!init);
        setOpen(false);
        toast.success("Success");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error generating episodes");
    } finally {
      setIsGeneratingEpisode(false);
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
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 150,
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
                    <div 
                      className="flex items-center gap-2"
                      onClick={() => handleDeleteClick(record)}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </div>
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
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded"
                      onClick={() => {
                        setSelectedVoiceOverRecord(record);
                        setEditVoiceOverVisible(true);
                      }}
                    >
                      <Edit size={16} />
                      <span>Edit Voice Translation</span>
                    </div>
                  ),
                },
                {
                  key: 'Add Thumnail Episode',
                  label: (
                    <MVLink to={`/dashboard/product/${record._id}/thumbnail/add`} state={{
                      thumbnail: {
                        thumbnail: record.thumnail,
                        name: record.name
                      }
                    }}>
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
                    <MVLink to={`/dashboard/product/${record._id}/thumbnail/edit`} state={{
                      thumbnail: {
                        thumbnail: record.thumnail,
                        name: record.name
                      }
                    }}>
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
         <div className="flex items-center gap-2">
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
          <ProductActions
            record={record}
            user={user}
            onDelete={confirm}
          />
         </div>
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
        thumbnail: value.thumnail  ? (
          <div className="flex items-center gap-2.5 py-1.5">
            {/* Thumbnail container with advanced styling */}
            <div className="relative group flex-shrink-0">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 
                              rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 
                              group-hover:opacity-100 transform scale-95 group-hover:scale-100"></div>
        
              {/* Main thumbnail image */}
              <img
                src={value.thumnail }
                alt={`${value.name} thumbnail`}
                className="relative w-11 h-11 object-cover rounded-xl border border-emerald-200/80 
                           shadow-sm transition-all duration-300 ease-out
                           group-hover:scale-105 group-hover:shadow-md group-hover:border-emerald-300
                           group-hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
        
              {/* Fallback placeholder (hidden by default) */}
              <div className="hidden w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 
                              border border-emerald-200 items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
        
              {/* Hover tooltip indicator */}
              <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 
                              bg-gradient-to-r from-emerald-600 to-green-600 transition-opacity 
                              duration-300 -z-10 blur-sm"></div>
            </div>
        
            {/* Edit button */}
            <div className="relative group flex-shrink-0">
              <Link to={`/dashboard/product/${value._id}/thumbnail/edit`} 
                    state={{
                      thumbnail: {
                        thumbnail: value.thumnail ,
                        name: value.name
                      }
                    }}>
                <div className="w-8 h-8 rounded-lg border border-gray-300/60 
                                bg-white hover:bg-gray-50
                                flex items-center justify-center
                                group-hover:border-blue-400/80 hover:shadow-sm
                                transition-all duration-200 cursor-pointer">
                  <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-600 transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </Link>
            </div>
        
            {/* Status info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 
                                 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60
                                 shadow-sm">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ready
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 py-1.5">
            {/* Status indicator for missing */}
            <div className="relative flex-shrink-0">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-400 shadow-sm"></span>
            </div>
        
            {/* Add thumbnail button */}
            <div className="relative group flex-shrink-0">
              <Link to={`/dashboard/product/${value._id}/thumbnail/add`} 
                    state={{
                      thumbnail: {
                        thumbnail: value.thumnail ,
                        name: value.name
                      }
                    }}>
                <div className="w-11 h-11 rounded-xl border-2 border-dashed border-orange-300/60 
                                bg-gradient-to-br from-orange-50/50 to-red-50/50 
                                flex items-center justify-center
                                group-hover:border-orange-400/80 group-hover:bg-orange-50/80
                                transition-all duration-200 cursor-pointer">
                  <svg className="w-4 h-4 text-orange-500 group-hover:text-orange-600 transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </Link>
            </div>
        
            {/* Status info for missing thumbnail */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 
                                 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60
                                 shadow-sm">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Upload Required
                </span>
              </div>
            </div>
          </div>
        )
      };
    });

  return (
    <>
      <PageTitle title="" subtitle="Movie Episode" />

      <ProductHeader
        onOpenDrawer={showDrawer}
        onGenerateEpisode={handleAutoRenderEpisodeMovie}
        selectedCategory={selectedCategory}
        onCategoryFilter={handleCategoryFilter}
        onEpisodeSearch={handleEpisodeSearch}
        categories={cate?.data || []}
        isGeneratingEpisode={isGeneratingEpisode}
        onRefresh={() => {
          dispatch(getProducts({ page: 0, categoryId: selectedCategory, seri: episodeSearch }));
        }}
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

      <ProductTable
        data={data}
        columns={columnsProduct}
        rowSelection={rowSelection}
        isLoading={isLoading}
        page={page}
        total={products?.totalCount}
        onPageChange={handlePageChangePage}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setSelectedRecord(null);
        }}
        selectedRecord={selectedRecord}
      />

      {/* Edit Voice Over Modal */}
      <EditVoiceOver
        open={editVoiceOverVisible}
        slug={selectedVoiceOverRecord?.slug}
        onClose={() => {
          setEditVoiceOverVisible(false);
          setSelectedVoiceOverRecord(null);
        }}
        onSuccess={() => {
          // Refresh data if needed
          dispatch(getProducts({ page, categoryId: selectedCategory, seri: episodeSearch }));
        }}
      />
    </>
  );
});

export default ProductAdmin;
