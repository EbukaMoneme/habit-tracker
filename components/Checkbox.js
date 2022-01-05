import { useState } from "react";

function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(props.default);

	async function updateStatus(id, day, status) {
		const newStatus = {id, day, status}
		const response = await fetch('/api/habits/update', {
			method: 'PUT',
			body: JSON.stringify(newStatus)
		})

		if (!response.ok) {
			throw new Error(response.statusText)
		}

		return await response.json();
	}

  return (
    <label>
      <input
        type="checkbox"
        onChange={async (event) => {
          setIsChecked(!isChecked);
					try {
						await updateStatus(props.id, props.value, props.status)
					} catch (err) {
						console.log(err)
					} finally {
						props.router.reload()
					}
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
