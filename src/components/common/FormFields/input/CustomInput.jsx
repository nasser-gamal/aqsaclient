import PropTypes from 'prop-types';

import './input.modules.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from 'react';

export default function CustomInput(props) {


  const {
    name,
    label,
    type,
    id,
    value,
    onFocus,
    onBlur,
    onChange,
    // error,
    placeholder,
    defaultValue,
    disabled,
    accept,
    hidden,
    onClick,
    // className,
    autoFocus,
    innerRef,
    // icon,
    passIcon,
    width,
    optional,
    ...otherProps
  } =
    props;


  const [showPass, setShowPass] = useState()


  return (
    <div className='form-input' style={{ width }}>
      {label && <label htmlFor={id}>{label}</label>}

      {
        type === 'textarea' ? <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          onClick={onClick}
          type={type}
          name={name}
          onChange={onChange}
          // className={
          //   className
          //     ? className
          //     : error
          //       ? "form-control is-invalid"
          //       : "form-control"
          // }
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          accept={accept}
          hidden={hidden}
          ref={innerRef}
          disabled={disabled}
          style={{
            ...otherProps
          }}>
        </textarea>
          :
          (
            <>

              <input
                onFocus={onFocus}
                onBlur={onBlur}
                autoFocus={autoFocus}
                onClick={onClick}
                type={passIcon && !showPass ? 'password' : type}
                name={name}
                onChange={onChange}
                // className={
                //   className
                //     ? className
                //     : error
                //       ? "form-control is-invalid"
                //       : "form-control"
                // }
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                accept={accept}
                hidden={hidden}
                ref={innerRef}
                disabled={disabled}
                style={{
                  ...otherProps
                }}
              />
              {
                passIcon && !showPass && (
                  <AiOutlineEyeInvisible onClick={() => setShowPass(true)} />
                )
              }
              {
                passIcon && showPass && (
                  <AiOutlineEye onClick={() => setShowPass(false)} />
                )}
            </>

          )
      }

      {/* {
        icon && icon
      } */}
      {
        optional &&
        <div className='text-center opional-input'>
          <span>*اختياري*</span>
        </div>
      }
      {/* {error && (
        <div className="error-msg">
          <span>{error}</span>
        </div>
      )} */}
    </div>
  )
}


CustomInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  accept: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  width: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  icon: PropTypes.element,
  passIcon: PropTypes.bool,
};