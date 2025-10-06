// Product API endpoints
export const PRODUCT_ENDPOINTS = {
  BASE: '/products',
  SINGLE: '/product',
  CREATE: '/product',
  UPDATE: '/product',
  DELETE: '/product',
  ADD_MULTIPLE: '/products/addMultiple',
  DELETE_MULTIPLE: '/products/deleteMultiple',
  IMPORT_EXCEL: '/products/create/excel',
  EXPORT_EXCEL: '/products/export/excel',
  BY_CATEGORY: '/category/products',
  PUSH_LIST: '/product/pushlist',
  UPLOAD_ABYSS: '/product/abyss',
  APPROVE: '/product/approve',
  APPROVE_CANCEL: '/product/approve/cancel',
  FILTER: '/product/filter',
  SEARCH: '/product/v',
  CLEAR_CACHE: '/products/clear',
  CLEAR_REDIS: '/products/clear/redis/bull',
  APPROVED_MULTIPLE: '/products/approvedMultiple',
  ENCODE_DAILYMOTION: '/products/encodeMultipleDailymotionServer',
  AUTO_ADD_EPISODE: '/products/autoAddEpisodeMovie',
  EDIT_VOICE_OVER: '/product/editVoiceOver',
  GET_VOICE_OVER: '/product/getVoiceOver',
  UPLOAD_THUMBNAIL: '/product',
  UPDATE_THUMBNAIL: '/product',
} as const;

// Query parameters
export const PRODUCT_QUERY_PARAMS = {
  PAGE: 'page',
  CATEGORY_ID: 'categoryId',
  SERI: 'seri',
  VERSION: 'version',
  NAME: 'name',
  CATEGORY: 'c',
} as const;

// HTTP methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

// Headers
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
} as const;

// Content types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
} as const;

// Bearer token prefix
export const BEARER_PREFIX = 'Bearer';

// Form data field names
export const FORM_DATA_FIELDS = {
  FILE: 'file',
  ID: '_id',
} as const;

// Product status
export const PRODUCT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Cache types
export const CACHE_TYPES = {
  PRODUCTS: 'products',
  REDIS: 'redis',
} as const;

// Error messages
export const PRODUCT_ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch products',
  CREATE_FAILED: 'Failed to create product',
  UPDATE_FAILED: 'Failed to update product',
  DELETE_FAILED: 'Failed to delete product',
  APPROVE_FAILED: 'Failed to approve product',
  UPLOAD_FAILED: 'Failed to upload file',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success messages
export const PRODUCT_SUCCESS_MESSAGES = {
  CREATED: 'Product created successfully',
  UPDATED: 'Product updated successfully',
  DELETED: 'Product deleted successfully',
  APPROVED: 'Product approved successfully',
  UPLOADED: 'File uploaded successfully',
  CACHE_CLEARED: 'Cache cleared successfully',
} as const;

// Pagination defaults
export const PRODUCT_PAGINATION_DEFAULTS = {
  PAGE_SIZE: 24,
  PAGE_SIZE_OPTIONS: ['24', '48', '72'],
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
} as const;

// Table column keys
export const PRODUCT_TABLE_COLUMNS = {
  NAME: 'name',
  SLUG: 'slug',
  IMAGE: 'image',
  STATUS: 'status',
  CATEGORY: 'category',
  YEAR: 'year',
  DURATION: 'duration',
  IS_ACTIVE: 'isActive',
  CREATED_AT: 'createdAt',
  ACTIONS: 'actions',
} as const;

// Voice over fields
export const VOICE_OVER_FIELDS = {
  VOICE_OVER_LINK: 'voiceOverLink',
  VOICE_OVER_LINK_2: 'voiceOverLink2',
} as const;
