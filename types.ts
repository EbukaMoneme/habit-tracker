export interface Habit {
	id:          number;
	title:       string;
	description: string;
	frequency:   string[];
	color:       string;
	status:      Status;
}

export interface Status {
	Friday:    boolean | string;
	Monday:    boolean | string;
	Sunday:    boolean | string;
	Tuesday:   boolean | string;
	Saturday:  boolean | string;
	Thursday:  boolean | string;
	Wednesday: boolean | string;
}
