import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';
import replace from '@rollup/plugin-replace';

const isDev = process.env.ROLLUP_WATCH === 'true';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),   // Resolves lit and other node modules
    json(),      // Allows importing JSON files
    isDev && serve({  // Serve and live reloading from debug mode
      open: true,
      contentBase: 'dist',
      port: 3000
    }),
    isDev && livereload('dist'),
    alias({      // Avoid relative paths and get references to three main data paths
      entries: [
        { find: '@src', replacement: path.resolve(__dirname, 'src')},
        { find: '@data', replacement: path.resolve(__dirname, 'data')},
        { find: '@fonts', replacement: path.resolve(__dirname, 'fonts')}
      ]
    }),
    replace({    // Correct the base for local and github pages
      preventAssignment: true,
      __BASE_HREF__: JSON.stringify(process.env.BASE_HREF || '/')
    })
  ]
};