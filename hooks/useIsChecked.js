import { useState } from "react";

export default function useIsChecked(defaultStatus) {
	const [isChecked, setIsChecked] = useState(defaultStatus);

	return { isChecked, setIsChecked }
}