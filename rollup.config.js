const path = require('path');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const entry = resolve('src/index.ts');

module.exports = [
  {
    input: entry,
    output: {
      dir: 'es',
      format: 'esm',
    },
    plugins: [
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
    ],
  },

  {
    input: entry,
    output: {
      dir: 'lib',
      format: 'umd',
      name: 'Browser',
    },
    plugins: [
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es5',
          },
        },
      }),
    ],
  },

  {
    input: entry,
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'Browser',
    },
    plugins: [
      terser({
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        // Added for profiling in devtools
        keep_classnames: false,
        keep_fnames: false,
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      }),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es5',
          },
        },
      }),
    ],
  },
];
