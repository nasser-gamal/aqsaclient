/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import CustomInput from "../input/CustomInput";

import "./select.modules.css";

export default function CustomSelect({
  dropHeading,
  label,
  isClicked,
  setIsClicked,
  onClick,
  searchInput,
  onChange,
  children,
}) {

  const selectRef = useRef(null);

  // handle Click OutSide
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (!selectRef.current?.contains(e.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
  }, [selectRef, setIsClicked]);

  return (
    <div className="input-form">
      {label && <label>{label}</label>}
      <div className="drop-down-menu" ref={selectRef}>
        <div className="drop-down-menu-content ">
          <div
            className={
              isClicked
                ? "drop-down-menu-heading clicked"
                : "drop-down-menu-heading"
            }
            onClick={onClick}
          >
            <span>{dropHeading} </span>
            <span className={isClicked ? "d-flex rotate" : 'd-flex'}>
              <IoMdArrowDropdown />
            </span>
          </div>

          <div
            className={isClicked ? "drop-down-body show " : "drop-down-body "}
          >
            {searchInput && (
              <CustomInput
                type="text"
                placeholder="ابحث هنا..."
                onChange={onChange}
              />
            )}
            <ul className="drop-down-menu-list">
              {children}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}





