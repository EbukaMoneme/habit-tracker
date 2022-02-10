
export default function useDOY(day) {
	return Math.ceil((day - new Date(day.getFullYear(),0,1)) / 86400000);
};