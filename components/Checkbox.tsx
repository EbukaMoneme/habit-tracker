import { useState } from "react";
import { supabase } from "../utils/supabase";

function Checkbox(props) {
  const [isChecked, setIsChecked] = useState<boolean>(props.default);
	// console.log(props.completion[props.index])
	const toggleChecked = async () => {
		// Toggle completed status
		setIsChecked(!isChecked)
		let newCompletion = [...props.completion]
		let habitCheck = props.completion[props.index]
		habitCheck === 0? newCompletion[props.index] = 1: newCompletion[props.index] = 0;

		const { data, error } = await supabase
		.from('habits')
		.update({ completion: newCompletion })
		.match({ title: props.title })
		if (error) {
			console.log(error)
		} else {
			console.log("Success")
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
