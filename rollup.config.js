import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
      globals: { 'styled-components': 'styled' },
    },
  ],
  plugins: [sass({ output: true }), typescript(), peerDepsExternal()],
  external: [
    'formik',
    'lodash.get',
    'react',
    'react-data-table-component',
    'react-date-range',
    'react-dom',
    'react-icons/bi',
    'react-icons/bs',
    'react-icons/fi',
    'react-icons/io5',
    'react-icons/md',
    'react-modal',
    'react-spinners/FadeLoader',
    'react-tiny-popover',
    'sweetalert2',
  ],
}
