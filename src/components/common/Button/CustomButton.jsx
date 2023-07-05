import PropTypes from 'prop-types';

import './button.modules.css';

export default function CustomButton({ children, classes, onClick, disabled, ...props }) {
  return (
    <button className={`${classes} `} style={
      { ...props }
    }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button >
  )
}

CustomButton.propTypes = {
  classes: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}
