const designWidth = 375;

export default {
  plugins: {
    "@unocss/postcss": {},
    autoprefixer: {},
    "postcss-px-to-viewport-8-plugin": {
      unitToConvert: "px", // 需要转换的单位，默认为 "px"
      viewportWidth: designWidth,
      //   viewportWidth(file: string) {
      //     if (file.includes("node_modules") && file.includes("vant")) {
      //       return designWidth / 2;
      //     }
      //     return designWidth;
      //   }, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ["*"], // 能转化为 vw 的属性列表
      viewportUnit: "vw", // 希望使用的视口单位
      fontViewportUnit: "vw", // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的 CSS 选择器
      minPixelValue: 1, // 设置最小的转换数值
      mediaQuery: true, // 媒体查询里的单位是否需要转换
      replace: true, // 是否直接更换属性值
      exclude: [], // 忽略某些文件夹下的文件或特定文件
      include: undefined, // 只转换匹配到的文件
      //   landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
      //   landscapeUnit: "vmin", // 横屏时使用的单位
      //   landscapeWidth: 667 * 2, // 横屏时的视口宽度
    },
    // "postcss-100vh-fix": {},
  },
};
