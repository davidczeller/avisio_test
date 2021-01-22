import React, { useRef, useState } from "react";
import "./Dropdown.scss";

import Button from './Button'
// import { useDetectOutsideClick } from "./useDetectOutsideClick";

export default function Dropdown({ content }) {
  const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const [isActive, setIsActive] = useState(true)//setToFalse

  return (
    <div className="container">
      <div className="menu-container">
        <Button
          className="menu-trigger"
          icon={<img src="https://img.icons8.com/ios/50/000000/mail-filter.png" />}
          tooltip='Filter'
          tooltipDirection='Bottom'
          handleClick={onClick}
        />
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          {content}
          {/* <ul>
            <li>
              <a href="#">Messages</a>
            </li>
            <li>
              <a href="#">Trips</a>
            </li>
            <li>
              <a href="#">Saved</a>
            </li>
          </ul> */}
        </nav>
      </div>
    </div>
  );
}
