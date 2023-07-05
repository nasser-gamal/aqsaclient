/* eslint-disable react/prop-types */

import './switch.modules.css';

export default function SwitchActive({ active, onClick }) {



  return (
    <div className={
      active ? 'toggle-account'
        : 'toggle-account in-active'
    } onClick={onClick}>
      <span ></span>
    </div>
  )
}
