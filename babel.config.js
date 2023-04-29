module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: [
          {'@features': './src/features'},
          {'@assets': './src/assets'},
          {'@hooks': './src/hooks'},
          {'@lib': './src/lib'},
          {'@services': './src/services'},
          {'@components': './src/components'},
          {'@navigation': './src/navigation'},
          {'@localization': './src/localization'},
          {'@utils': './src/utils'},
          {'@theme': './src/theme'},
        ],
      },
    ],
  ],
};
