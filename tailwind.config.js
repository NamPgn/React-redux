module.exports = {
  presets: [
    {
      // sử dụng plugin preflight
      preset: require('tailwindcss/defaultConfig'),
      // tắt các style mặc định
      corePlugins: {
        preflight: false,
      },
    },
    require('./path/to/your/custom/config'),
  ],
  // ...
};