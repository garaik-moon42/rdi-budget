class ProjectIncome {
    project: string;
    fix: number;
    monthly: number;
    hourly: number;
    currency: string;
    from: Date;
    until: Date;
    comment: string;
    vat: boolean;

    constructor(r: any[]) {
        this.project = r[0];
        this.fix = r[3];
        this.monthly = r[4];
        this.hourly = r[5];
        this.currency = r[6];
        this.from = r[7];
        this.until = r[8];
        if (r[2] !== null && r[2] !== "") {
            this.comment = r[2] + ", " + r[9];
        }
        else {
            this.comment = r[9];
        }
        this.vat = r[10];
    }
}

function createMonthlyIncomesRow_(month: Month, projectIncome: ProjectIncome, daysInMonth: number, interval: [Date, Date]):BudgetRow {
    let pd = dateDiffInDays_(projectIncome.from, projectIncome.until) + 1;
    let id = dateDiffInDays_(interval[0], interval[1]) + 1;
    let c = projectIncome.fix * ((id > pd) ? 1 : id / pd);
    c += projectIncome.monthly * id / daysInMonth;
    c += month.workdays * 8 * projectIncome.hourly * id / daysInMonth;
    return new BudgetRow(month.from, c, projectIncome.currency, projectIncome.project, projectIncome.comment, 'INCOME', 'RDI');
}

function monthlyIncomes_(months: Month[], projectIncomes: ProjectIncome[]):BudgetRow[] {
    let result: BudgetRow[] = [];
    months.forEach(function (m) {
        let md = dateDiffInDays_(m.from, m.until) + 1;

        projectIncomes.forEach(function (p) {
            let i = intersect_(m.from, m.until, p.from, p.until);
            if (i) {
                result.push(createMonthlyIncomesRow_(m, p, md, i));
            }
        });
    });
    return result;
}
