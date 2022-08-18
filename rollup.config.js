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
    'react',
    'react-dom',
    'sweetalert2',
    'formik',
    'react-icons/bi',
    'lodash.get',
  ],
}
