class BudgetRow {
    month: Date;
    amount: number;
    currency: string;
    project: string;
    comment: string;
    type: string;
    payer: string;

    constructor(month: Date, amount: number, currency: string, project: string, comment: string, type: string, payer: string) {
        this.month = month;
        this.amount = amount;
        this.currency = currency;
        this.project = project;
        this.comment = comment;
        this.type = type;
        this.payer = payer;
    }
}
