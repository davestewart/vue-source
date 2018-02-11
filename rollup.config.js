// ------------------------------------------------------------------------------------------
// setup
// ------------------------------------------------------------------------------------------

import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies || {});

function output (file, format = 'umd') {
  return {
    name: pkg.name.replace(/(^\w|-\w)/g, c => c.replace('-', '').toUpperCase()),
    file: 'dist/' + file,
    format: format,
    exports: 'default',
  }
}

// ------------------------------------------------------------------------------------------
// build
// ------------------------------------------------------------------------------------------

const umd = {
  input: 'src/main.js',
  external: external,
  output: output('bundle.js'),
  plugins: [
    commonjs(),
    buble()
  ]
}

const min = Object.assign({}, umd, {
  output: output('bundle.min.js'),
  plugins: [...umd.plugins, uglify()]
})

const es = Object.assign({}, umd, {
  output: output('bundle.es.js', 'es')
})

export default [umd, min, es]
