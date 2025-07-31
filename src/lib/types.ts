export interface Member {
	id: string;
	name: string;
}

export interface Expense {
	id: string;
	amount: number;
	title: string;
}

export interface SplitDivvy {
	id: string;
	total: number;
	splitTotal: number;
	members: Member[];
	expenses: Expense[];
}