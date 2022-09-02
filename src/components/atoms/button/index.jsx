import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ id, onClick, disabled, children }) => {
  return (
    <button
      id={id}
      onClick={() => onClick()}
      className="button is-info"
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
}

Button.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
}

export default Button
