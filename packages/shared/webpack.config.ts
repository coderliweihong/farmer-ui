import * as path from 'path';
import * as webpack from 'webpack';
const isProd = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()  === 'production';
const libType:string = process.env.LIB_TYPE && process.env.LIB_TYPE.toLowerCase() || '';
/**
 * generate library output config
 * @param type module type
 */
const generateLibOutputConfig = (type: string) => {
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
    }
}

/**
 * generate library externals config
 * @param type module type
 */
const generateLibExternalsConfig = (type: string) => {
    switch (type) {
        case 'umd':
            return {
                externals: {
                    lodash: {
                        commonjs: 'lodash',
                        commonjs2: 'lodash',
                        amd: 'lodash',
                        root: '_', // 指向全局变量
                    }
                }
            }
        case 'module':
            return {
                externals: {
                    lodash: 'lodash'
                }
            }
        case 'commonjs':
            return {
                externals: {
                    lodash: 'lodash'
                }
            }
        default:
            return {
                externals: {
                    lodash: {
                        commonjs: 'lodash',
                        commonjs2: 'lodash',
                        amd: 'lodash',
                        root: '_', // 指向全局变量
                    }
                }
            }
    }
}

/**
 * generate library externalsType config
 * @param type module type
 */
const generateLibExternalsTypeConfig = (type: string) => {
    switch (type) {
        case 'umd':
            return 'umd';
        case 'module':
            return 'module';
        case 'commonjs':
            return 'commonjs';
        default:
            return 'umd';
    }
}
const config: webpack.Configuration = {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.ts',
    // 由于输出 ESM 格式文件为 Webpack 实验特性，因此需要加上此配置。
    experiments: {
        outputModule: libType === 'module'
    },
    output: generateLibOutputConfig(libType),
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
        extensions: ['.ts', '.js', '.json']
    },
    devtool: 'source-map',
    externalsType: generateLibExternalsTypeConfig(libType),
    externals: generateLibExternalsConfig(libType).externals
};
export default config;