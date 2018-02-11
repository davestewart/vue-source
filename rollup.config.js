import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = Object.keys(require('./package.json').dependencies || {});

export default [
  // browser-friendly UMD build
  {
    input: 'src/browser.js',
    external: external,
    output: {
      globals: {
        vue: 'Vue',
      },
      name: 'VueSource',
      file: pkg.browser['index.js'],
      format: 'umd',
    },
    plugins: [
      resolve(),  // so Rollup can find `vue`
      commonjs(), // so Rollup can convert `vue` to an ES module
      babel({
        exclude: 'node_modules/**'
      }),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/vue-source.js',
    external: external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]

  }
];
