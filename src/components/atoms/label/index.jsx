import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ id, children }) => {
  return (
    <label htmlFor={id} className="label">
      {children}
    </label>
  )
}

Label.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default Label
