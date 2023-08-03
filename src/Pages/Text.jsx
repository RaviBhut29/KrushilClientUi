import React, { useEffect, useRef, useState } from "react";
import { UseOutsideClick } from "../Comman/UseOutsideClick";

const Text = () => {
  const divRef = useRef(null);
  const [isDivVisible, setDivVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setDivVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleButtonClick(event) {
    event.stopPropagation();
    setDivVisible(!isDivVisible);
  }

  return (
    <>
      <div>
        <button onClick={handleButtonClick}>Button</button>

        <div ref={divRef} style={{ display: isDivVisible ? "block" : "none" }}>
          <p>This is the content of the div.</p>
        </div>
      </div>
    </>
  );
};

export default Text;
