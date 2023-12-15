import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const isProd = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()  === 'production';
const isTestdist = process.env.TEST_DIST && process.env.TEST_DIST.toLowerCase()  === 'testdist';

const config: webpack.Configuration & { devServer?: DevServerConfiguration } = {
    mode: isProd ? 'production' : 'development',
    entry: './src/App.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /.(tsx|ts|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        rootMode: "upward",
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
                    MiniCssExtractPlugin.loader,
                    // 将 CSS 转化成 CommonJS 模块
                    {
                        loader: 'css-loader'
                    },
                    //处理css3不同浏览器兼容性
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                    'postcss-preset-env',
                                ],
                            },
                        },
                    },
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: isTestdist ? {
            '@': path.resolve(__dirname, 'src/'),
        }: {
            '@farmerui/ui': path.resolve(__dirname, '..','packages/ui/src'),
            '@farmerui/button': path.resolve(__dirname, '..','packages/button/src'),
            '@farmerui/input': path.resolve(__dirname, '..','packages/input/src'),
            '@farmerui/shared': path.resolve(__dirname, '..','packages/shared/src'),
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello Demo',
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    devtool: 'source-map',
    devServer: {
        static: './dist',
        host: '0.0.0.0',
        port: 9527,
        open: false,
        hot: true
    },
    externals: [
        {
            'react': 'React',
            'react-dom': 'ReactDOM',
        }
    ]
};
export default config;