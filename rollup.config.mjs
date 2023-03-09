import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import smartAsset from "rollup-plugin-smart-asset"
import styles from "rollup-plugin-styles";

const config = {
	input: 'src/index.js',
	output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            assetFileNames: "[name][extname]"
        },
	    {
            file: 'dist/index.modern.js',
            format: 'es',
            assetFileNames: "[name][extname]"
        }
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({
            extensions: ['.js', '.jsx', '.json', '.mjs'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            preventAssignment: true
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/env', '@babel/preset-react']
        }),
        json(),
        styles({
            mode: 'extract',
            autoModules: true
        }),
        smartAsset({
            url: 'copy',
            keepImport: true,
            useHash: true,
            keepName: true
        }),
    ],
};

export default config;
