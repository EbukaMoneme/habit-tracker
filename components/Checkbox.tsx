import { useState } from "react";

function Checkbox(props) {

  const [isChecked, setIsChecked] = useState<boolean>(props.default);

	const toggleChecked = async () => {
		// Toggle completed status
		setIsChecked(!isChecked)

		try {
			// Update database
			await props.updateStatus(props.id, props.value, props.status)
		} catch (err) {
			console.log(err)
		} finally {
			// Reload page to re-fetch habit props
			props.router.reload()
		}
	}

  return (
    <label>
      <input
        type="checkbox"
        onChange={toggleChecked}
				disabled={props.disabled}
      />
      <span
        className={`checkbox ${props.disabled? 'hidden': ''}`}
				style={isChecked? {background: props.color} :{background: ''}}
        aria-hidden="true"
      />
    </label>
  );
}

export default Checkbox
