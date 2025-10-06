// Constants specific to product management for both 2D and 3D versions

import { ProductVersion } from '../types';

// Version-specific constants
export const VERSION_CONFIGS = {
  '2d': {
    colorScheme: {
      primary: 'blue',
      secondary: 'cyan',
      accent: 'indigo',
    },
    icons: {
      play: '🎬',
      dimension: '📐',
    },
    labels: {
      dimension: '2D',
      quality: 'HD',
    },
  },
  '3d': {
    colorScheme: {
      primary: 'emerald',
      secondary: 'green',
      accent: 'teal',
    },
    icons: {
      play: '🎥',
      dimension: '📦',
    },
    labels: {
      dimension: '3D',
      quality: '3D HD',
    },
  },
} as const;

// Common table column configurations
export const COMMON_TABLE_COLUMNS = {
  NAME: 'name',
  SLUG: 'slug',
  CATEGORY: 'category',
  SERI: 'seri',
  IS_ACTIVE: 'isActive',
  THUYET_MINH: 'thuyetMinh',
  THUMBNAIL: 'thumbnail',
  ACTION: 'action',
} as const;

// Version-specific table configurations
export const VERSION_TABLE_CONFIGS = {
  '2d': {
    columnWidths: {
      NAME: 180,
      SLUG: 200,
      CATEGORY: 150,
      SERI: 50,
      IS_ACTIVE: 50,
      THUYET_MINH: 50,
      THUMBNAIL: 150,
      ACTION: 80,
    },
    fixedColumns: {
      ACTION: 'right',
    },
  },
  '3d': {
    columnWidths: {
      NAME: 180,
      SLUG: 200,
      CATEGORY: 150,
      SERI: 50,
      IS_ACTIVE: 50,
      THUYET_MINH: 50,
      THUMBNAIL: 150,
      ACTION: 80,
    },
    fixedColumns: {
      ACTION: 'right',
    },
  },
} as const;

// Version-specific status indicators
export const VERSION_STATUS_INDICATORS = {
  '2d': {
    ACTIVE: {
      DOT_COLOR: 'bg-blue-500',
      TEXT_COLOR: 'text-blue-700',
    },
    INACTIVE: {
      DOT_COLOR: 'bg-red-500',
      TEXT_COLOR: 'text-red-700',
    },
    READY: {
      BG_COLOR: 'bg-blue-50',
      TEXT_COLOR: 'text-blue-700',
      BORDER_COLOR: 'border-blue-200/60',
    },
    UPLOAD_REQUIRED: {
      BG_COLOR: 'bg-orange-50',
      TEXT_COLOR: 'text-orange-700',
      BORDER_COLOR: 'border-orange-200/60',
    },
  },
  '3d': {
    ACTIVE: {
      DOT_COLOR: 'bg-emerald-500',
      TEXT_COLOR: 'text-emerald-700',
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
  },
} as const;

// Version-specific thumbnail configurations
export const VERSION_THUMBNAIL_CONFIGS = {
  '2d': {
    sizes: {
      MAIN: 'w-11 h-11',
      EDIT_BUTTON: 'w-8 h-8',
      ADD_BUTTON: 'w-11 h-11',
    },
    borders: {
      MAIN: 'border-blue-200/80',
      HOVER: 'border-blue-300',
      DASHED: 'border-orange-300/60',
      DASHED_HOVER: 'border-orange-400/80',
    },
    backgrounds: {
      MAIN: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      ADD: 'bg-gradient-to-br from-orange-50/50 to-red-50/50',
      ADD_HOVER: 'bg-orange-50/80',
    },
  },
  '3d': {
    sizes: {
      MAIN: 'w-11 h-11',
      EDIT_BUTTON: 'w-8 h-8',
      ADD_BUTTON: 'w-11 h-11',
    },
    borders: {
      MAIN: 'border-emerald-200/80',
      HOVER: 'border-emerald-300',
      DASHED: 'border-orange-300/60',
      DASHED_HOVER: 'border-orange-400/80',
    },
    backgrounds: {
      MAIN: 'bg-gradient-to-br from-emerald-50 to-green-100',
      ADD: 'bg-gradient-to-br from-orange-50/50 to-red-50/50',
      ADD_HOVER: 'bg-orange-50/80',
    },
  },
} as const;

// Helper function to get version-specific config
export const getVersionConfig = (version: ProductVersion) => {
  return {
    version: VERSION_CONFIGS[version],
    table: VERSION_TABLE_CONFIGS[version],
    status: VERSION_STATUS_INDICATORS[version],
    thumbnail: VERSION_THUMBNAIL_CONFIGS[version],
  };
};
