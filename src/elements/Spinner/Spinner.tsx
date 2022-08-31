import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import './Spinner.scss'

// https://www.npmjs.com/package/react-spinners
const Spinner = () => (
  <div className="eq-spinner">
    <div>
      {
        // @ts-ignore
        <FadeLoader
          color="#000000"
          height="10"
          width="4"
          margin="0"
          radius="4"
        />
      }
    </div>
  </div>
)

export default Spinner
