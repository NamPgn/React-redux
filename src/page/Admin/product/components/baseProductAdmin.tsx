import React, { memo, useContext, useEffect, useState } from "react";
import { Dropdown, message, Tag } from "antd";
import {
  getProducts,
  deleteProduct,
  autoGenarateEpisodeMovieSlice,
} from "../../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import {
  approvedMultipleMovies,
  approveProduct,
  cancelApproveProduct,
  clearCacheProducts,
  clearCacheRedis,
  deleteMultipleProduct,
  endcodeMutipleDailymotionServer,
} from "../../../../sevices/product";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { MyButton } from "../../../../components/MV/Button";
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
import MVLink from "../../../../components/Location/Link";
import { MyContext } from "../../../../context";
import {
  USER_ROLES,
  TABLE_COLUMNS,
  MENU_ITEM_KEYS,
  STATUS_TEXT,
  BUTTON_TEXT,
  CSS_CLASSES,
  URLS,
  MESSAGES,
  PAGE_LABELS,
  TABLE_CONFIG,
  STATUS_INDICATORS,
  CATEGORY_DISPLAY,
  THUMBNAIL_CONFIG,
} from "../../../../constants/ui";

import PageTitle from "../../../../components/PageTitle";
import ProductTable from "../ui/ProductTable";
import ProductHeader from "../ui/ProductHeader";
import ProductDrawer from "../ui/ProductDrawer";
import EditVoiceOver from "../component/edit-voice-over";
import "../style.css";
import { Link } from "react-router-dom";
import ProductActions from "../ui/ProductActions";
import DeleteConfirmModal from "../component/deleteConfirmModal";
import EditProductModal from "../component/editProductModal";
import { ProductVersion, ProductConfig } from "../types";
import { getVersionConfig } from "../constants";
import { getAllcateVersion2 } from "../../../../redux/slice/category/thunk/category";

interface BaseProductAdminProps {
  version: ProductVersion;
  config: ProductConfig;
}

const BaseProductAdmin = memo<BaseProductAdminProps>(({ version, config }) => {
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
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const [pageCategory, setPageCategory] = useState(0);
  // Get version-specific configuration
  const versionConfig = getVersionConfig(version);
  useEffect(() => {
    dispatch(getProducts({ page, categoryId: selectedCategory, seri: episodeSearch, version }));
  }, [page, selectedCategory, episodeSearch, init, version]);

  useEffect(() => {
    dispatch(getAllcateVersion2({ page: pageCategory, search: searchCategory, version }));
  }, [pageCategory, searchCategory, version]);

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
    dispatch(getProducts({ page: value, categoryId: selectedCategory, seri: episodeSearch, version }));
  };

  const handleDeleteSelectedData = async () => {
    const response: any = await deleteMultipleProduct(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success(MESSAGES.SUCCESS.DELETE_PRODUCTS);
    } else {
      toast.error(MESSAGES.ERROR.DELETE_PRODUCTS);
    }
  };

  const handleApprovedMultipleMovies = async () => {
    const response: any = await approvedMultipleMovies(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success(MESSAGES.SUCCESS.APPROVED_PRODUCTS);
    } else {
      toast.error(MESSAGES.ERROR.DELETE_PRODUCTS);
    }
  };

  const handleEditEncodeMutipleDailymotionServer = async () => {
    const response: any = await endcodeMutipleDailymotionServer(selectedRowKeys);
    if (response.data.success == true) {
      setInit(!init);
      toast.success(MESSAGES.SUCCESS.EDIT_PRODUCTS);
    } else {
      toast.error(MESSAGES.ERROR.DELETE_PRODUCTS);
    }
  };

  const confirm = async (id) => {
    const response = await dispatch(deleteProduct(id));
    if (response.payload.success) {
      toast.success(MESSAGES.SUCCESS.DELETE_PRODUCT);
    } else {
      toast.error(MESSAGES.ERROR.DELETE_PRODUCT);
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
      toast.error(MESSAGES.ERROR.GENERAL);
    }
  };

  const cancelHandleApproved = async (id: any) => {
    const response = await cancelApproveProduct(id);
    if (response.data.success == true) {
      toast.success(response.data.message);
      setInit(!init);
    } else {
      toast.error(MESSAGES.ERROR.GENERAL);
    }
  };

  const handleDeleteClick = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleEditClick = (record: any) => {
    setSelectedEditRecord(record);
    setEditProductModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRecord) {
      try {
        const response = await dispatch(deleteProduct(selectedRecord.key));
        if (response.payload?.success == true) {
          toast.success(response.payload?.message || MESSAGES.CONFIRM.DELETE_SUCCESS);
          setInit(!init);
        } else {
          toast.error(MESSAGES.CONFIRM.DELETE_FAILED);
        }
      } catch (error) {
        toast.error(MESSAGES.CONFIRM.GENERAL_ERROR);
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
        toast.success(MESSAGES.SUCCESS.GENERATE_EPISODE);
      } else {
        toast.error(MESSAGES.ERROR.GENERAL);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR.GENERATE_EPISODE);
    } finally {
      setIsGeneratingEpisode(false);
    }
  };

  // Version-specific column configuration
  const getColumnsProduct = () => {
    const baseColumns = [
      {
        title: "Name",
        dataIndex: TABLE_COLUMNS.NAME,
        key: TABLE_COLUMNS.NAME,
        width: versionConfig.table.columnWidths.NAME,
        render: (text: string) => (
          <span className={`${CSS_CLASSES.TRUNCATE} ${CSS_CLASSES.TEXT_START}`}>{text}</span>
        ),
      },
      {
        title: "Slug",
        dataIndex: TABLE_COLUMNS.SLUG,
        key: TABLE_COLUMNS.SLUG,
        width: versionConfig.table.columnWidths.SLUG,
        render: (text: string) => (
          <span className={`${CSS_CLASSES.TRUNCATE} ${CSS_CLASSES.TEXT_START} ${CSS_CLASSES.BLOCK}`}>{text}</span>
        ),
      },
      {
        title: "Category",
        key: TABLE_COLUMNS.CATEGORY,
        dataIndex: TABLE_COLUMNS.CATEGORY,
        width: versionConfig.table.columnWidths.CATEGORY,
        render: (text: string) => (
          <span className={`${CSS_CLASSES.TRUNCATE} ${CSS_CLASSES.TEXT_START} ${CSS_CLASSES.BLOCK}`}>{text}</span>
        ),
      },
      {
        title: "Seri",
        key: TABLE_COLUMNS.SERI,
        dataIndex: TABLE_COLUMNS.SERI,
        width: versionConfig.table.columnWidths.SERI,
        render: (text: string) => (
          <span className={`${CSS_CLASSES.TRUNCATE} ${CSS_CLASSES.MAX_W_80} ${CSS_CLASSES.BLOCK}`}>{text}</span>
        ),
      },
      {
        title: "Active",
        dataIndex: TABLE_COLUMNS.IS_ACTIVE,
        key: TABLE_COLUMNS.IS_ACTIVE,
        width: versionConfig.table.columnWidths.IS_ACTIVE,
        render: (text: any) => (
          <span>{text}</span>
        ),
      },
      {
        title: "Thuyet Minh",
        dataIndex: TABLE_COLUMNS.THUYET_MINH,
        key: TABLE_COLUMNS.THUYET_MINH,
        width: versionConfig.table.columnWidths.THUYET_MINH,
        render: (text: any) => (
          <span>{text}</span>
        ),
      },
      {
        title: "Thumbnail",
        dataIndex: TABLE_COLUMNS.THUMBNAIL,
        key: TABLE_COLUMNS.THUMBNAIL,
        width: versionConfig.table.columnWidths.THUMBNAIL,
      },
      {
        title: "Action",
        key: TABLE_COLUMNS.ACTION,
        dataIndex: TABLE_COLUMNS.ACTION,
        width: versionConfig.table.columnWidths.ACTION,
        fixed: versionConfig.table.fixedColumns.ACTION,
        render: (_: any, record: any) => {
          const getMenuItems = () => {
            switch (user?.role) {
              case USER_ROLES.VIEWER:
                return [
                  {
                    key: MENU_ITEM_KEYS.VIEW,
                    label: (
                      <MVLink to={"/"}>
                        <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                          <Eye size={16} />
                          <span>{BUTTON_TEXT.VIEW}</span>
                        </div>
                      </MVLink>
                    ),
                  },
                ];
              case USER_ROLES.EDITOR:
                return [
                  {
                    key: MENU_ITEM_KEYS.VIEW,
                    label: (
                      <MVLink to={"/"}>
                        <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                          <Eye size={16} />
                          <span>{BUTTON_TEXT.VIEW}</span>
                        </div>
                      </MVLink>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.EDIT,
                    label: (
                      <div 
                        className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                        onClick={() => handleEditClick(record)}
                      >
                        <Edit size={16} />
                        <span>{BUTTON_TEXT.EDIT}</span>
                      </div>
                    ),
                  },
                ];
              case USER_ROLES.ADMIN:
                return [
                  {
                    key: MENU_ITEM_KEYS.COPY_LINK,
                    label: (
                      <button
                        onClick={() => {
                          const link = `${config.baseUrl}${config.movieViewPath}/${record.slug}`;
                          navigator.clipboard.writeText(link)
                            .then(() => {
                              message.success(MESSAGES.SUCCESS.COPY_LINK);
                            })
                            .catch((err) => {
                              console.error(MESSAGES.ERROR.COPY_FAILED, err);
                            });
                        }}
                        className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                      >
                        <LinkIcon size={16} />
                        <span>{BUTTON_TEXT.COPY_LINK}</span>
                      </button>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.EDIT,
                    label: (
                      <div 
                        className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                        onClick={() => handleEditClick(record)}
                      >
                        <Edit size={16} />
                        <span>{BUTTON_TEXT.EDIT}</span>
                      </div>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.DELETE,
                    label: (
                      <div 
                        className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                        onClick={() => handleDeleteClick(record)}
                      >
                        <Trash2 size={16} />
                        <span>{BUTTON_TEXT.DELETE}</span>
                      </div>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.MOVE_UP,
                    label: (
                      <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                        <ArrowUp size={16} />
                        <span>{BUTTON_TEXT.MOVE_UP}</span>
                      </div>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.EDIT_VOICE_OVER,
                    label: (
                      <div 
                        className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2} ${CSS_CLASSES.CURSOR_POINTER} ${CSS_CLASSES.HOVER_BG_GRAY_100} ${CSS_CLASSES.ROUNDED_FULL}`}
                        onClick={() => {
                          setSelectedVoiceOverRecord(record);
                          setEditVoiceOverVisible(true);
                        }}
                      >
                        <Edit size={16} />
                        <span>{BUTTON_TEXT.EDIT_VOICE_TRANSLATION}</span>
                      </div>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.ADD_THUMBNAIL_EPISODE,
                    label: (
                      <MVLink to={`${config.thumbnailAddPath}/${record._id}/thumbnail/add`} state={{
                        thumbnail: {
                          thumbnail: record.thumnail,
                          name: record.name
                        }
                      }}>
                        <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                          <CirclePlus size={16} />
                          <span>{BUTTON_TEXT.ADD_THUMBNAIL_EPISODE}</span>
                        </div>
                      </MVLink>
                    ),
                  },
                  {
                    key: MENU_ITEM_KEYS.EDIT_THUMBNAIL_EPISODE,
                    label: (
                      <MVLink to={`${config.thumbnailEditPath}/${record._id}/thumbnail/edit`} state={{
                        thumbnail: {
                          thumbnail: record.thumnail,
                          name: record.name
                        }
                      }}>
                        <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                          <Pencil size={16} />
                          <span>{BUTTON_TEXT.EDIT_THUMBNAIL_EPISODE}</span>
                        </div>
                      </MVLink>
                    ),
                  },
                  ...(record?.isApproved
                    ? [
                      {
                        key: MENU_ITEM_KEYS.APPROVED,
                        label: (
                          <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
                            <Check size={16} />
                            <span>{BUTTON_TEXT.APPROVED}</span>
                          </div>
                        ),
                        disabled: true,
                      },
                      {
                        key: MENU_ITEM_KEYS.CANCEL_APPROVAL,
                        label: (
                          <div
                            className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                            onClick={() => cancelHandleApproved(record.key)}
                          >
                            <XCircle size={16} />
                            <span>{BUTTON_TEXT.CANCEL_APPROVAL}</span>
                          </div>
                        ),
                      },
                    ]
                    : [
                      {
                        key: MENU_ITEM_KEYS.APPROVE,
                        label: (
                          <div
                            className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}
                            onClick={() => handleApproved(record.key)}
                          >
                            <Send size={16} />
                            <span>{BUTTON_TEXT.APPROVE}</span>
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
           <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_2}`}>
             <Dropdown
              menu={{
                items: getMenuItems(),
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <MyButton type="text" shape="circle" className={CSS_CLASSES.HOVER_BG_GRAY_100}>
                <MoreVertical size={16} />
              </MyButton>
            </Dropdown>
            <ProductActions
              record={record}
              user={user}
              onDelete={confirm}
              onEdit={handleEditClick}
            />
           </div>
          );
        },
      },
    ];

    return baseColumns;
  };

  // Version-specific data transformation
  const getData = () => {
    if (!products?.data) return [];
    
    return products.data.map((value: any) => {
        return {
          _id: value._id,
          key: value._id,
          name: (
            <div className={CSS_CLASSES.FLEX_COL}>
              <span className={`${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.TEXT_GRAY_800} ${CSS_CLASSES.FONT_SMALL}`}>{value.name}</span>
              <span className={`${CSS_CLASSES.FONT_XS} ${CSS_CLASSES.TEXT_GRAY_500} ${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
                <Calendar className={CSS_CLASSES.W_2_5_H_2_5} />
                {new Date(value.createdAt).toLocaleDateString()}
              </span>
            </div>
          ),
          slug: value.slug,
          trailer: value.trailer ? (
            <span className={`${CSS_CLASSES.PX_2} ${CSS_CLASSES.PY_0_5} ${CSS_CLASSES.FONT_XS} ${CSS_CLASSES.FONT_MEDIUM} ${STATUS_INDICATORS.HAS_TRAILER.BG_COLOR} ${STATUS_INDICATORS.HAS_TRAILER.TEXT_COLOR} ${CSS_CLASSES.ROUNDED_FULL} ${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <PlayCircle className="w-3 h-3" />
              {STATUS_TEXT.HAS_TRAILER}
            </span>
          ) : (
            <span className={`${CSS_CLASSES.PX_2} ${CSS_CLASSES.PY_0_5} ${CSS_CLASSES.FONT_XS} ${CSS_CLASSES.FONT_MEDIUM} ${STATUS_INDICATORS.NO_TRAILER.BG_COLOR} ${STATUS_INDICATORS.NO_TRAILER.TEXT_COLOR} ${CSS_CLASSES.ROUNDED_FULL} ${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <Film className="w-3 h-3" />
              {STATUS_TEXT.NO_TRAILER}
            </span>
          ),
          category: (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.FLEX_COL} ${CSS_CLASSES.GAP_0_5}`}>
              <span className={`${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.TEXT_GRAY_800} ${CSS_CLASSES.FONT_SMALL}`}>{value?.category?.name}</span>
              <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.FLEX_WRAP} ${CSS_CLASSES.GAP_1}`}>
                <span className={`${CSS_CLASSES.PX_1_5} ${CSS_CLASSES.PY_0_5} ${CSS_CLASSES.FONT_XS} ${CSS_CLASSES.FONT_MEDIUM} ${CATEGORY_DISPLAY.LANG.BG_COLOR} ${CATEGORY_DISPLAY.LANG.TEXT_COLOR} ${CSS_CLASSES.ROUNDED_FULL} ${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
                  <Globe className={CSS_CLASSES.W_2_5_H_2_5} />
                  {value?.category?.lang}
                </span>
                <span className={`${CSS_CLASSES.PX_1_5} ${CSS_CLASSES.PY_0_5} ${CSS_CLASSES.FONT_XS} ${CSS_CLASSES.FONT_MEDIUM} ${CATEGORY_DISPLAY.QUALITY.BG_COLOR} ${CATEGORY_DISPLAY.QUALITY.TEXT_COLOR} ${CSS_CLASSES.ROUNDED_FULL} ${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
                  <Star className={CSS_CLASSES.W_2_5_H_2_5} />
                  {value?.category?.quality}
                </span>
              </div>
            </div>
          ),
          seri: (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.JUSTIFY_CENTER} ${CSS_CLASSES.TEXT_BLUE_700} ${CSS_CLASSES.ROUNDED_FULL} ${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.FONT_SMALL}`}>
              {value?.seri}
            </div>
          ),
          isActive: value.server2 || value.dailyMotionServer ? (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <div className={`${CSS_CLASSES.W_1_5_H_1_5} ${versionConfig.status.ACTIVE.DOT_COLOR} ${CSS_CLASSES.ROUNDED_FULL}`}></div>
              <span className={`${versionConfig.status.ACTIVE.TEXT_COLOR} ${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.FONT_SMALL}`}>{STATUS_TEXT.ACTIVE}</span>
            </div>
          ) : (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <div className={`${CSS_CLASSES.W_1_5_H_1_5} ${versionConfig.status.INACTIVE.DOT_COLOR} ${CSS_CLASSES.ROUNDED_FULL}`}></div>
              <span className={`${versionConfig.status.INACTIVE.TEXT_COLOR} ${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.FONT_SMALL}`}>{STATUS_TEXT.INACTIVE}</span>
            </div>
          ),
          thuyetMinh: value.voiceOverLink ? (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <Check size={16} />
              <span className={`${CSS_CLASSES.TEXT_GREEN_700} ${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.FONT_SMALL}`}>{STATUS_TEXT.YES}</span>
            </div>
          ) : (
            <div className={`${CSS_CLASSES.FLEX} ${CSS_CLASSES.ITEMS_CENTER} ${CSS_CLASSES.GAP_1}`}>
              <XCircle size={16} />
              <span className={`${CSS_CLASSES.TEXT_RED_700} ${CSS_CLASSES.FONT_MEDIUM} ${CSS_CLASSES.FONT_SMALL}`}>{STATUS_TEXT.NO}</span>
            </div>
          ),
          thumbnail: renderThumbnail(value),
        };
      });
  };

  // Version-specific thumbnail rendering
  const renderThumbnail = (value: any) => {
    const thumbnailConfig = versionConfig.thumbnail;
    
    return value.thumnail ? (
      <div className="flex items-center gap-2.5 py-1.5">
        {/* Thumbnail container with version-specific styling */}
        <div className="relative group flex-shrink-0">
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 
                          group-hover:opacity-100 transform scale-95 group-hover:scale-100 ${
                            version === '2d' 
                              ? 'bg-gradient-to-br from-blue-400/20 to-cyan-600/20' 
                              : 'bg-gradient-to-br from-emerald-400/20 to-green-600/20'
                          }`}></div>
    
          {/* Main thumbnail image */}
          <img
            src={value.thumnail}
            alt={`${value.name} thumbnail`}
            className={`relative ${thumbnailConfig.sizes.MAIN} object-cover rounded-xl border ${thumbnailConfig.borders.MAIN} 
                       shadow-sm transition-all duration-300 ease-out
                       group-hover:scale-105 group-hover:shadow-md group-hover:${thumbnailConfig.borders.HOVER}
                       group-hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
            }}
          />
    
          {/* Fallback placeholder (hidden by default) */}
          <div className={`hidden ${thumbnailConfig.sizes.MAIN} rounded-xl ${thumbnailConfig.backgrounds.MAIN} 
                          border ${thumbnailConfig.borders.MAIN} items-center justify-center`}>
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
    
          {/* Hover tooltip indicator */}
          <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity 
                          duration-300 -z-10 blur-sm ${
                            version === '2d' 
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                              : 'bg-gradient-to-r from-emerald-600 to-green-600'
                          }`}></div>
        </div>
    
        {/* Edit button */}
        <div className="relative group flex-shrink-0">
          <Link to={`${config.thumbnailEditPath}/${value._id}/thumbnail/edit`} 
                state={{
                  thumbnail: {
                    thumbnail: value.thumnail,
                    name: value.name
                  }
                }}>
            <div className={`${thumbnailConfig.sizes.EDIT_BUTTON} rounded-lg border border-gray-300/60 
                            bg-white hover:bg-gray-50
                            flex items-center justify-center
                            group-hover:border-blue-400/80 hover:shadow-sm
                            transition-all duration-200 cursor-pointer`}>
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
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 
                             rounded-md ${versionConfig.status.READY.BG_COLOR} ${versionConfig.status.READY.TEXT_COLOR} border ${versionConfig.status.READY.BORDER_COLOR}
                             shadow-sm`}>
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
          <Link to={`${config.thumbnailAddPath}/${value._id}/thumbnail/add`} 
                state={{
                  thumbnail: {
                    thumbnail: value.thumnail,
                    name: value.name
                  }
                }}>
            <div className={`${thumbnailConfig.sizes.ADD_BUTTON} rounded-xl border-2 border-dashed ${thumbnailConfig.borders.DASHED} 
                            ${thumbnailConfig.backgrounds.ADD} 
                            flex items-center justify-center
                            group-hover:${thumbnailConfig.borders.DASHED_HOVER} group-hover:${thumbnailConfig.backgrounds.ADD_HOVER}
                            transition-all duration-200 cursor-pointer`}>
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
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 
                             rounded-md ${versionConfig.status.UPLOAD_REQUIRED.BG_COLOR} ${versionConfig.status.UPLOAD_REQUIRED.TEXT_COLOR} border ${versionConfig.status.UPLOAD_REQUIRED.BORDER_COLOR}
                             shadow-sm`}>
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Upload Required
            </span>
          </div>
        </div>
      </div>
    );
  };

  const columnsProduct = getColumnsProduct();
  const data = getData();

  return (
    <>
      <PageTitle title={config.title} subtitle={config.subtitle} />

      <ProductHeader
        onOpenDrawer={showDrawer}
        onGenerateEpisode={handleAutoRenderEpisodeMovie}
        selectedCategory={selectedCategory}
        onCategoryFilter={handleCategoryFilter}
        onEpisodeSearch={handleEpisodeSearch}
        categories={cate?.data || []}
        isGeneratingEpisode={isGeneratingEpisode}
        onRefresh={() => {
          dispatch(getProducts({ page: 0, categoryId: selectedCategory, seri: episodeSearch, version }));
        }}
        version={version}
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
        version={version}
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
          dispatch(getProducts({ page, categoryId: selectedCategory, seri: episodeSearch, version }));
        }}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        open={editProductModalVisible}
        onClose={() => {
          setEditProductModalVisible(false);
          setSelectedEditRecord(null);
        }}
        productId={selectedEditRecord?.slug}
        version={version}
        onSuccess={() => {
          // Refresh data after successful edit
          dispatch(getProducts({ page, categoryId: selectedCategory, seri: episodeSearch, version }));
        }}
      />
    </>
  );
});

BaseProductAdmin.displayName = 'BaseProductAdmin';

export default BaseProductAdmin;
