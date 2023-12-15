import * as path from 'path';
import * as webpack from 'webpack';
const isProd = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()  === 'production';
const libType:string = process.env.LIB_TYPE && process.env.LIB_TYPE.toLowerCase() || '';
const isTestdist = process.env.TEST_DIST && process.env.TEST_DIST.toLowerCase()  === 'testdist';
/**
 * get library output config
 * @param type module type
 */
const getLibOutputConfig = (type: string) => {
    switch (type) {
        case 'umd':
            return {
                path: path.resolve(__dirname, 'dist'),
                filename: 'index.js',
                library: {
                    name: 'FarmerUIShared',
                    type: 'umd',
                    export: 'default'
                },
                globalObject: 'globalThis',
                clean: true
            }
            break;
        case 'module':
            return {
                path: path.resolve(__dirname, 'es'),
                filename: 'index.esm.js',
                library: {
                    type: 'module'
                },
                chunkFormat: 'module',
                clean: true
            }
            break;
        case 'commonjs':
            return {
                path: path.resolve(__dirname, 'lib'),
                filename: 'index.js',
                library: {
                    name: 'FarmerUIShared',
                    type: 'commonjs'
                },
                clean: true
            }
            break;
        default:
            return {
                path: path.resolve(__dirname, 'dist'),
                filename: 'index.js',
                library: {
                    name: 'FarmerUIShared',
                    type: 'umd',
                    export: 'default'
                },
                globalObject: 'globalThis',
                clean: true
            }
            break;
    }
}
const config: webpack.Configuration = {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.ts',
    // 由于输出 ESM 格式文件为 Webpack 实验特性，因此需要加上此配置。
    experiments: {
        outputModule: libType === 'module'
    },
    output: getLibOutputConfig(libType),
    module: {
        rules: [
            {
                test: /.(ts|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        rootMode: "upward",
                    }
                },
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    devtool: 'source-map',
    externals:libType === 'module' || isTestdist ? {} : {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_', // 指向全局变量
        }
    }
};
export default config;