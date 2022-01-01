import { useState } from "react";

function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
				disabled={props.disabled? true: false}
      />
      <span
        className={`checkbox ${props.disabled? 'hidden': ''}`}
				style={isChecked? {background: props.color} :{background: ''}}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
      />
    </label>
  );
}

export default Checkbox
