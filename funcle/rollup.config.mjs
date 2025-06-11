import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import del from 'rollup-plugin-delete';

const isDev = process.env.ROLLUP_WATCH === 'true';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: 'bundle.[hash].js'
  },
  plugins: [
    !isDev && del({       // Clean up dist file
      targets: 'dist/*'
    }),
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
    }),
    resolve(),   // Resolves lit and other node modules
    json(),      // Allows importing JSON files
    html({       // Generate an HTML but use the correct hash
      title: 'Funcle',
      template: ({ attributes, files, meta, publicPath, title }) => {
        const scripts = (files.js || [])
          .map(({ fileName }) => `<script type="module" src="${publicPath}${fileName}"></script>`)
          .join('\n');
        const baseHref = process.env.BASE_HREF || '/';
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <base href="${baseHref}"/>
  </head>
  <body style="margin: 0; padding: 0; touch-action: manipulation;">
    <svg style="display: none">
      <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
      >
          <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
          />
          <!-- Liked Seeds: 5, 14, 17 -->

          <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lighting-color="white"
          result="specLight"
          >
          <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
          />

          <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
          />
      </filter>
    </svg>
    <funcle-app></funcle-app>
    ${scripts}
  </body>
</html>
        `;
      }
    }),
    isDev && serve({  // Serve and live reloading from debug mode
      open: true,
      contentBase: 'dist',
      port: 3000
    }),
    isDev && livereload('dist')
  ]
};