import React, { useRef, useState } from "react";
import "./Dropdown.scss";

import Button from './Button'
import FilterIcon from '../../Static/Images/icons8-mail-filter-50.png'

export default function Dropdown({ content }) {

  const dropdownRef = useRef(null);
  const onClick = () => setIsActive(!isActive);
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="container">
      <div className="menu-container">
        <Button
          className="menu-trigger"
          buttonIcon={FilterIcon} 
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
