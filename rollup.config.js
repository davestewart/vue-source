import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

/*
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel';
const old = {
  input: 'src/vue-source.js',
  output: {
    name: 'VueSource',
    file: 'index.js',
    format: 'cjs',
    globals: {
      vue: 'Vue',
    },
  },
  external: [
    'vue'
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
}
*/

export default [
  // browser-friendly UMD build
  {
    input: 'src/vue-source.js',
    external: ['vue'],
    output: {
      globals: {
        vue: 'Vue',
      },
      name: 'VueSource',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `vue`
      commonjs() // so Rollup can convert `vue` to an ES module
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
    external: ['vue'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
