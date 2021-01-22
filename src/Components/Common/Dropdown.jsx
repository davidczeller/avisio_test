import React, { useRef, useState } from "react";
import "./Dropdown.scss";

import Button from './Button'
// import { useDetectOutsideClick } from "./useDetectOutsideClick";

export default function Dropdown({ content }) {
  const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="container">
      <div className="menu-container">
        <Button
          className="menu-trigger"
          icon={<img src="https://img.icons8.com/ios/24/ffffff/mail-filter.png" />}
          tooltip='Filter'
          tooltipDirection='bottom'
          handleClick={onClick}
        />
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          {content}
        </nav>
      </div>
    </div>
  );
}
