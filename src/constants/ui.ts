// User roles
export const USER_ROLES = {
  VIEWER: 0,
  EDITOR: 1,
  ADMIN: 2,
} as const;

// Table column keys
export const TABLE_COLUMNS = {
  NAME: 'name',
  SLUG: 'slug',
  CATEGORY: 'category',
  SERI: 'seri',
  IS_ACTIVE: 'isActive',
  THUYET_MINH: 'thuyetMinh',
  THUMBNAIL: 'thumbnail',
  ACTION: 'action',
} as const;

// Menu item keys
export const MENU_ITEM_KEYS = {
  VIEW: 'view',
  EDIT: 'edit',
  DELETE: 'delete',
  COPY_LINK: 'Copy Link',
  MOVE_UP: 'move-up',
  EDIT_VOICE_OVER: 'edit-voice-over',
  ADD_THUMBNAIL_EPISODE: 'Add Thumnail Episode',
  EDIT_THUMBNAIL_EPISODE: 'Edit Thumnail Episode',
  APPROVED: 'approved',
  CANCEL_APPROVAL: 'cancel-approval',
  APPROVE: 'approve',
} as const;

// Status text
export const STATUS_TEXT = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  YES: 'Yes',
  NO: 'No',
  READY: 'Ready',
  UPLOAD_REQUIRED: 'Upload Required',
  HAS_TRAILER: 'Has Trailer',
  NO_TRAILER: 'No Trailer',
} as const;

// Button text
export const BUTTON_TEXT = {
  VIEW: 'View',
  EDIT: 'Edit',
  DELETE: 'Delete',
  COPY_LINK: 'Copy Link',
  MOVE_UP: 'Move Up',
  EDIT_VOICE_TRANSLATION: 'Edit Voice Translation',
  ADD_THUMBNAIL_EPISODE: 'Add Thumnail Episode',
  EDIT_THUMBNAIL_EPISODE: 'Edit Thumnail Episode',
  APPROVED: 'Approved',
  CANCEL_APPROVAL: 'Cancel Approval',
  APPROVE: 'Approve',
} as const;

// CSS classes
export const CSS_CLASSES = {
  // Text styling
  TRUNCATE: 'truncate',
  TEXT_START: 'text-start',
  TEXT_CENTER: 'text-center',
  FONT_MEDIUM: 'font-medium',
  FONT_SMALL: 'text-sm',
  FONT_XS: 'text-xs',
  
  // Colors
  TEXT_GRAY_800: 'text-gray-800',
  TEXT_GRAY_500: 'text-gray-500',
  TEXT_GREEN_700: 'text-green-700',
  TEXT_RED_700: 'text-red-700',
  TEXT_BLUE_700: 'text-blue-700',
  TEXT_ORANGE_700: 'text-orange-700',
  TEXT_PURPLE_700: 'text-purple-700',
  TEXT_YELLOW_700: 'text-yellow-700',
  
  // Backgrounds
  BG_GREEN_100: 'bg-green-100',
  BG_RED_100: 'bg-red-100',
  BG_BLUE_100: 'bg-blue-100',
  BG_GRAY_100: 'bg-gray-100',
  BG_ORANGE_100: 'bg-orange-100',
  BG_PURPLE_100: 'bg-purple-100',
  BG_YELLOW_100: 'bg-yellow-100',
  BG_EMERALD_50: 'bg-emerald-50',
  BG_ORANGE_50: 'bg-orange-50',
  
  // Borders
  BORDER_EMERALD_200: 'border-emerald-200',
  BORDER_ORANGE_300: 'border-orange-300',
  BORDER_GRAY_300: 'border-gray-300',
  
  // Sizing
  W_11_H_11: 'w-11 h-11',
  W_8_H_8: 'w-8 h-8',
  W_4_H_4: 'w-4 h-4',
  W_3_5_H_3_5: 'w-3.5 h-3.5',
  W_2_5_H_2_5: 'w-2.5 h-2.5',
  W_2_H_2: 'w-2 h-2',
  W_1_5_H_1_5: 'w-1.5 h-1.5',
  
  // Layout
  FLEX: 'flex',
  FLEX_COL: 'flex-col',
  FLEX_WRAP: 'flex-wrap',
  ITEMS_CENTER: 'items-center',
  JUSTIFY_CENTER: 'justify-center',
  GAP_1: 'gap-1',
  GAP_2: 'gap-2',
  GAP_2_5: 'gap-2.5',
  GAP_0_5: 'gap-0.5',
  
  // Positioning
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute',
  FIXED: 'fixed',
  
  // Rounded
  ROUNDED_FULL: 'rounded-full',
  ROUNDED_XL: 'rounded-xl',
  ROUNDED_LG: 'rounded-lg',
  ROUNDED_MD: 'rounded-md',
  
  // Spacing
  PX_2: 'px-2',
  PX_1_5: 'px-1.5',
  PY_0_5: 'py-0.5',
  PY_1_5: 'py-1.5',
  
  // Effects
  SHADOW_SM: 'shadow-sm',
  SHADOW_MD: 'shadow-md',
  HOVER_BG_GRAY_100: 'hover:bg-gray-100',
  HOVER_BG_GRAY_50: 'hover:bg-gray-50',
  HOVER_SCALE_105: 'hover:scale-105',
  HOVER_SCALE_100: 'hover:scale-100',
  HOVER_BORDER_BLUE_400: 'hover:border-blue-400',
  HOVER_BORDER_ORANGE_400: 'hover:border-orange-400',
  HOVER_BORDER_EMERALD_300: 'hover:border-emerald-300',
  HOVER_TEXT_BLUE_600: 'hover:text-blue-600',
  HOVER_TEXT_ORANGE_600: 'hover:text-orange-600',
  
  // Transitions
  TRANSITION_ALL: 'transition-all',
  TRANSITION_COLORS: 'transition-colors',
  DURATION_200: 'duration-200',
  DURATION_300: 'duration-300',
  
  // Display
  HIDDEN: 'hidden',
  BLOCK: 'block',
  INLINE_FLEX: 'inline-flex',
  
  // Cursor
  CURSOR_POINTER: 'cursor-pointer',
  
  // Border styles
  BORDER_DASHED: 'border-dashed',
  BORDER_2: 'border-2',
  
  // Opacity
  OPACITY_0: 'opacity-0',
  OPACITY_100: 'opacity-100',
  
  // Transform
  SCALE_95: 'scale-95',
  SCALE_100: 'scale-100',
  TRANSLATE_Y_0_5: '-translate-y-0.5',
  
  // Z-index
  Z_10: '-z-10',
  
  // Blur
  BLUR_SM: 'blur-sm',
  BLUR_MD: 'blur-md',
  
  // Backdrop
  BACKDROP_BLUR_SM: 'backdrop-blur-sm',
  
  // Min width
  MIN_W_0: 'min-w-0',
  
  // Flex shrink
  FLEX_SHRINK_0: 'flex-shrink-0',
  
  // Max width
  MAX_W_80: 'max-w-[80px]',
  
  // Width
  W_180: 'w-180',
  W_200: 'w-200',
  W_150: 'w-150',
  W_50: 'w-50',
  W_80: 'w-80',
} as const;

// URLs and links
export const URLS = {
  BASE_URL: 'https://hh3dtq.site',
  MOVIE_VIEW: '/xem-phim',
  DASHBOARD_PRODUCT_EDIT: '/dashboard/product/edit',
  DASHBOARD_PRODUCT_THUMBNAIL_ADD: '/dashboard/product',
  DASHBOARD_PRODUCT_THUMBNAIL_EDIT: '/dashboard/product',
  DASHBOARD_HOME: '/dashboard',
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    COPY_LINK: 'Copy link successfully',
    DELETE_PRODUCT: 'Delete product successfully',
    DELETE_PRODUCTS: 'Delete products successfully',
    APPROVED_PRODUCTS: 'Approved Products Successfully',
    EDIT_PRODUCTS: 'Edit Products Successfully',
    GENERATE_EPISODE: 'Success',
  },
  ERROR: {
    COPY_FAILED: 'Copy failed',
    DELETE_PRODUCT: 'Error deleting product',
    DELETE_PRODUCTS: 'Error deleting products',
    GENERATE_EPISODE: 'Error generating episodes',
    GENERAL: 'Error!',
    CACHE_CLEAR: 'Error clearing cache',
  },
  CONFIRM: {
    DELETE_SUCCESS: 'Xóa thành công',
    DELETE_FAILED: 'Xóa thất bại',
    GENERAL_ERROR: 'Có lỗi xảy ra',
  },
} as const;

// Page titles and labels
export const PAGE_LABELS = {
  TITLE: '',
  SUBTITLE: 'Movie Episode',
} as const;

// Table configuration
export const TABLE_CONFIG = {
  COLUMN_WIDTHS: {
    NAME: 180,
    SLUG: 200,
    CATEGORY: 150,
    SERI: 50,
    IS_ACTIVE: 50,
    THUYET_MINH: 50,
    THUMBNAIL: 150,
    ACTION: 80,
  },
  FIXED_COLUMNS: {
    ACTION: 'right',
  },
} as const;

// Status indicators
export const STATUS_INDICATORS = {
  ACTIVE: {
    DOT_COLOR: 'bg-green-500',
    TEXT_COLOR: 'text-green-700',
  },
  INACTIVE: {
    DOT_COLOR: 'bg-red-500',
    TEXT_COLOR: 'text-red-700',
  },
  READY: {
    BG_COLOR: 'bg-emerald-50',
    TEXT_COLOR: 'text-emerald-700',
    BORDER_COLOR: 'border-emerald-200/60',
  },
  UPLOAD_REQUIRED: {
    BG_COLOR: 'bg-orange-50',
    TEXT_COLOR: 'text-orange-700',
    BORDER_COLOR: 'border-orange-200/60',
  },
  HAS_TRAILER: {
    BG_COLOR: 'bg-blue-100',
    TEXT_COLOR: 'text-blue-700',
  },
  NO_TRAILER: {
    BG_COLOR: 'bg-gray-100',
    TEXT_COLOR: 'text-gray-700',
  },
} as const;

// Category display
export const CATEGORY_DISPLAY = {
  LANG: {
    BG_COLOR: 'bg-purple-100',
    TEXT_COLOR: 'text-purple-700',
  },
  QUALITY: {
    BG_COLOR: 'bg-yellow-100',
    TEXT_COLOR: 'text-yellow-700',
  },
} as const;

// Thumbnail configuration
export const THUMBNAIL_CONFIG = {
  SIZES: {
    MAIN: 'w-11 h-11',
    EDIT_BUTTON: 'w-8 h-8',
    ADD_BUTTON: 'w-11 h-11',
  },
  BORDERS: {
    MAIN: 'border-emerald-200/80',
    HOVER: 'border-emerald-300',
    DASHED: 'border-orange-300/60',
    DASHED_HOVER: 'border-orange-400/80',
  },
  BACKGROUNDS: {
    MAIN: 'bg-gradient-to-br from-emerald-50 to-green-100',
    ADD: 'bg-gradient-to-br from-orange-50/50 to-red-50/50',
    ADD_HOVER: 'bg-orange-50/80',
  },
} as const;
