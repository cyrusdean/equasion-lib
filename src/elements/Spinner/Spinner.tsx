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
          height="10px"
          width="4px"
          margin="0px"
          radius="4px"
        />
      }
    </div>
  </div>
)

export default Spinner
