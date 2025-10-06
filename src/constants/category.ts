// Category status constants
export const CATEGORY_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

// Category types
export const CATEGORY_TYPES = {
  MOVIE: 'isMovie',
  SERIES: 'drama',
} as const;

// Quality options
export const QUALITY_OPTIONS = {
  HD: 'HD',
  FULL_HD: 'FHD',
  ULTRA_HD: '4K',
} as const;

// Language options
export const LANGUAGE_OPTIONS = {
  VIETSUB: 'Vietsub',
  THUYETMINH: 'ThuyetMinh',
  THUYETMINH_VIETSUB: 'ThuyetMinh-Vietsub',
} as const;

// Movie type options
export const MOVIE_TYPES = {
  FEATURE_FILM: 'feature_film',
  SHORT_FILM: 'short_film',
  DOCUMENTARY: 'documentary',
  SERIES: 'series',
} as const;

// Upcoming releases options
export const UPCOMING_RELEASES = [
  { name: 'This Week', value: 'this_week' },
  { name: 'Next Week', value: 'next_week' },
  { name: 'This Month', value: 'this_month' },
  { name: 'Next Month', value: 'next_month' },
  { name: 'This Year', value: 'this_year' },
] as const;

// Release status options
export const RELEASES = [
  {
    name: "Chuẩn bị ra mắt",
    val: "comming",
  },
  {
    name: "Đã ra mắt",
    val: "comeout",
  },
] as const;

// Movie type options (Vietnamese)
export const ISMOVIE = [
  {
    name: "Một Tập",
    val: "movie",
  },
  {
    name: "Nhiều Tập",
    val: "drama",
  },
] as const;

// Form validation rules
export const CATEGORY_VALIDATION_RULES = {
  NAME: {
    required: 'Category name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
  },
  DESCRIPTION: {
    maxLength: { value: 500, message: 'Description must not exceed 500 characters' },
  },
  YEAR: {
    min: { value: 1900, message: 'Year must be after 1900' },
    max: { value: new Date().getFullYear() + 5, message: 'Year must not exceed 5 years from now' },
  },
} as const;

// API endpoints
export const CATEGORY_ENDPOINTS = {
  ALL: '/categorys/all',
  BASE: '/v2/categorys',
  CREATE: '/category',
  UPDATE: '/category',
  DELETE: '/category',
  TOGGLE_ACTIVE: '/category/change/isActive',
  RECYCLE_BIN: '/c/recycle',
  RESTORE: '/category/restore',
  PERMANENT_DELETE: '/category/permanent-delete',
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 24,
  PAGE_SIZE_OPTIONS: ['24', '48', '72'],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
} as const;

// Table column keys
export const CATEGORY_TABLE_COLUMNS = {
  NAME: 'name',
  SLUG: 'slug',
  IMAGE: 'image',
  STATUS: 'status',
  YEAR: 'year',
  DURATION: 'duration',
  IS_ACTIVE: 'isActive',
  WEEK: 'week',
  CREATED_AT: 'createdAt',
  ACTIONS: 'actions',
} as const;

// Error messages
export const CATEGORY_ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch categories',
  CREATE_FAILED: 'Failed to create category',
  UPDATE_FAILED: 'Failed to update category',
  DELETE_FAILED: 'Failed to delete category',
  TOGGLE_ACTIVE_FAILED: 'Failed to toggle category status',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success messages
export const CATEGORY_SUCCESS_MESSAGES = {
  CREATED: 'Category created successfully',
  UPDATED: 'Category updated successfully',
  DELETED: 'Category deleted successfully',
  TOGGLE_ACTIVE_SUCCESS: 'Category status updated successfully',
  RESTORED: 'Category restored successfully',
} as const;
