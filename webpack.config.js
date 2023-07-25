// 단점 : 직접 써야함
// 장점 : 세세하게 ..

// import
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// export
module.exports = {
  // parcel index.html
  entry: './js/main.js', // 파일 읽어들이는 진입점 설정
  // 결과물(번들)을 반환하는 설정
  output: {
    // path:path.resolve(__dirname, 'dist'), // path를 가지고 와서 resolve(경로 합쳐주는) __dirname:불러와서 사용 할 수 있는 변수- 현재 파일이 있는 경로를 말함 즉, 두개를 합쳐서 ...
    // filename:'main.js', // entry에서 읽어들이는 파일
    clean: true, // 기존에 있었던 파일 삭제
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, // 정규문자식 삽입
        use: [
          'style-loader', // 실제로 html부분에 스타일 태그 부분에 해석된 부분을 삽입하는 역할
          'css-loader',
          'postcss-loader',
          'sass-loader', // 먼저 로드 - 자바스크립트에서 css파일 해석하는 역할
          // 순서 중요!!
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html', // root폴더 내 index.html
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }, // static 폴더 내용이 카피 -> dist폴더로 들어갈 수 있게 해주는 플러그인
      ],
    }),
  ],
  devServer: {
    host: 'localhost',
  },
};
