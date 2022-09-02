import React from 'react'
import PropTypes from 'prop-types'

const InputText = ({ id, placeholder, classes, onChange }) => {
  return (
    <input
      id={id}
      className={classes.join(' ')}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

InputText.defaultProps = {
  classes: ['input'],
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default InputText
