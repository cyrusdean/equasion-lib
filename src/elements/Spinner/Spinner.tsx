import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import './Spinner.scss'

// https://www.npmjs.com/package/react-spinners
const Spinner = () => (
  <div className="eq-spinner">
    <div>
      {
        // @ts-ignore
        <FadeLoader color="rgb(10, 73, 117)" />
      }
    </div>
  </div>
)

export default Spinner
