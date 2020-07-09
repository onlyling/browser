const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

/**
 * 构建文件配置
 */
const buildConfig = (output, plugins = []) => {
  return {
    input: resolve('src/index.js'),
    output,
    plugins: [babel({ babelHelpers: 'bundled' })].concat(plugins),
  };
};

module.exports = [
  buildConfig({
    dir: 'es',
    format: 'esm',
  }),
  buildConfig({
    dir: 'umd',
    format: 'umd',
    name: 'Browser',
  }),
  buildConfig(
    {
      dir: 'umd.min',
      format: 'umd',
      name: 'Browser',
    },
    [terser()],
  ),
];
