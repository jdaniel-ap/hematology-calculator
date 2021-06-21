import React from 'react'

function InputCheckBox({ defaultValue, title }) {
  return (
      <option 
        name='age'
        className='age-container'
        value={defaultValue}
      >
        {title}
      </option>
  )
}

export default InputCheckBox
