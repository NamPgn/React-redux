// Product types and interfaces for both 2D and 3D versions

export type ProductVersion = '2d' | '3d';

export interface ProductConfig {
  version: ProductVersion;
  title: string;
  subtitle: string;
  apiEndpoint: string;
  baseUrl: string;
  movieViewPath: string;
  editPath: string;
  thumbnailAddPath: string;
  thumbnailEditPath: string;
}

export interface ProductRecord {
  _id: string;
  key: string;
  name: string;
  slug: string;
  category: {
    name: string;
    lang: string;
    quality: string;
  };
  seri: string;
  isActive: boolean;
  thuyetMinh: boolean;
  thumnail?: string;
  trailer?: string;
  voiceOverLink?: string;
  voiceOverLink2?: string;
  server2?: string;
  dailyMotionServer?: string;
  isApproved?: boolean;
  createdAt: string;
}

export interface ProductTableData {
  _id: string;
  key: string;
  name: React.ReactNode;
  slug: string;
  category: React.ReactNode;
  seri: React.ReactNode;
  isActive: React.ReactNode;
  thuyetMinh: React.ReactNode;
  thumbnail: React.ReactNode;
  trailer?: React.ReactNode;
  voiceOverLink?: string;
  voiceOverLink2?: string;
  server2?: string;
  dailyMotionServer?: string;
  isApproved?: boolean;
  createdAt: string;
}

export interface ProductTableProps {
  data: ProductTableData[];
  columns: any[];
  rowSelection: any;
  isLoading: boolean;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface ProductHeaderProps {
  onOpenDrawer: () => void;
  onGenerateEpisode: () => void;
  selectedCategory: string;
  onCategoryFilter: (value: string) => void;
  onEpisodeSearch: (value: string) => void;
  categories: any[];
  isGeneratingEpisode: boolean;
  onRefresh: () => void;
  version: ProductVersion;
}

export interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onDeleteSelected: () => void;
  onApproveMultiple: () => void;
  onEditMultiple: () => void;
  onClearCache: () => void;
  onClearCacheRedis: () => void;
  categories: any[];
  version: ProductVersion;
}

export interface ProductActionsProps {
  record: ProductRecord;
  user: any;
  onDelete: (id: string) => void;
  version: ProductVersion;
}

export interface DeleteConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedRecord: ProductRecord | null;
}

export interface EditVoiceOverProps {
  open: boolean;
  slug?: string;
  onClose: () => void;
  onSuccess: () => void;
}

// Configuration for different versions
export const PRODUCT_CONFIGS: Record<ProductVersion, ProductConfig> = {
  '2d': {
    version: '2d',
    title: 'Quản lý phim 2D',
    subtitle: 'Movie Episode 2D',
    apiEndpoint: '/products/2d',
    baseUrl: 'https://hh3dtq.site',
    movieViewPath: '/xem-phim-2d',
    editPath: '/dashboard/product-2d/edit',
    thumbnailAddPath: '/dashboard/product-2d',
    thumbnailEditPath: '/dashboard/product-2d',
  },
  '3d': {
    version: '3d',
    title: 'Quản lý phim 3D',
    subtitle: 'Movie Episode 3D',
    apiEndpoint: '/products/3d',
    baseUrl: 'https://hh3dtq.site',
    movieViewPath: '/xem-phim-3d',
    editPath: '/dashboard/product-3d/edit',
    thumbnailAddPath: '/dashboard/product-3d',
    thumbnailEditPath: '/dashboard/product-3d',
  },
};
