export default function useValidDate(year, month, day) {
	const { DateTime } = require("luxon");
	const febDays = DateTime.local(year).daysInYear === 366? 29: 28;
	const calendar = {
		1: 31,
		2: febDays,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	}
	let newYear;
	let newMonth;
	let newDay;

	if (day > calendar[month]) {
		newDay = day - calendar[month]
		newMonth = month + 1
		if (newMonth > 12) {
			newYear = year + 1;
			newMonth = 1;
		} else {
			newYear = year
		}
	} else if (day <= 0) {
		console.log(day)
		if (month === 1) {
			newYear = year - 1;
			newMonth = 12;
			newDay = calendar[newMonth] + day
		} else {
			newDay = calendar[month-1] + day
			newMonth = month - 1
			newYear = year
		}
	} else {
		newDay = day
		newMonth = month
		newYear = year
	}
	return { newYear, newMonth, newDay }
};