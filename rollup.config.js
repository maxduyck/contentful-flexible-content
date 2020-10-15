import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import svg from 'rollup-plugin-svg';
import path from 'path';

console.log(path);

export default {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: [
    'react',
    'prop-types',
    '@contentful/forma-36-react-components',
    '@contentful/forma-36-react-components/dist/styles.css',
  ],
  plugins: [
    alias({
      entries: [
        { find: 'components', replacement: path.resolve(__dirname, 'src/components/index') },
        { find: 'contexts', replacement: path.resolve(__dirname, 'src/contexts/index') },
      ],
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    svg({ base64: true }),
  ],
  watch: {
    include: ['src/**'],
  },
};