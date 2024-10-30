import { resolve } from 'path'

export default {
  entry: './src/index.ts',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 使用什么做兼容性处理
          presets: [
            // '@babel/preset-env' 只能做简单的兼容性处理
            [
              '@babel/preset-env',
              {
                // 实现按需加载
                useBuiltIns: 'usage',
                // 版本
                corejs: { version: 3 },
                // 兼容版本的浏览器
                targets: {
                  chrome: ''
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'production',
  target: 'node',
  devtool: 'source-map'
}
