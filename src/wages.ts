const KIVA_RATE = 0.1;
const TAX_RATE = 1 + KIVA_RATE; // ToDo: calculate with time-dependent accurate tax rate
const SZJA_RATE = 0.15;

class Month {
    from: Date;
    until: Date;
    workdays: number;

    constructor(row: any[]) {
        this.from = row[0];
        this.until = row[1];
        this.workdays = row[2];
    }
}

class Wage {
    name: string;
    payer: string;
    from: Date;
    until: Date;
    wageGross: number;
    wageElse: number;
    szepCard: number;
    lakhatasi: number;
    feeMonthly: number;
    feeHourly: number;
    motivation: number;
    currency: string;
    contractType: string;
    company: string;
    comment: string;
    discount: number;

    constructor(row:any[]) {
        this.name = row[0];
        this.payer = row[1];
        this.from = row[2];
        this.until = row[3];
        this.wageGross = row[4];
        this.wageElse = row[5];
        this.szepCard = row[6];
        this.lakhatasi = row[7];
        this.feeMonthly = row[8];
        this.feeHourly = row[9];
        this.motivation = row[10];
        this.currency = row[11];
        this.contractType = row[12];
        this.company = row[13];
        this.comment = row[14];
        this.discount = row[16];
    }
}

/**
 * Calculates and returns the monthly wage costs of the employees.
 *
 * @param {range} monthsData Months for which the wages should be calculated. The range should contain three columns: first day of the month, last day of the month and number of workdays in that month.
 * @return The calculated wages. The result contains four columns: month, wage cost for that month, project and the details.
 * @customfunction
 */
function MONTHLY_WAGES(monthsData: any[]) {
    let months:Month[] = monthsData.map(function(r: any[]):Month {
        return new Month(r);
    });
    let sheetByName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WAGES');
    if (sheetByName === null) {
        throw "INVALID STATE: the returned sheet is null"
    }
    let wagesData:any[][] = sheetByName.getRange('A:R').getValues().slice(1);
    let wages:Wage[] = wagesData.map(function(r: any[]):Wage {
        return new Wage(r);
    })
  return monthlyWages2_(months, wages, getProjectMembers2()).map(toArray);
}

function monthlyWages2_(months: Month[], wages: Wage[], pmMonths: PmMonths) {
    let result:BudgetRow[] = [];
    months.forEach(function (month) {
      const pmMembers = pmMonths[getMonthKey_(month.from)];
      if (pmMembers) {
        wages.forEach(function(wage) {
          let mwi = intersect_(month.from, month.until, wage.from, wage.until);
          if (mwi) {
            let pmProjects = pmMembers[wage.name];
            for (let project in pmProjects) {
              result.push(createMonthlyWagesRow2_(month, wage, project, pmProjects[project], mwi[0], mwi[1]));
            }
          }
        });
      }
    });
    return result;
}

function createMonthlyWagesRow2_(month: Month, wage: Wage, project: string, scale: number, from: Date, until: Date):BudgetRow {
    let mw = (wage.wageGross + wage.wageElse) * TAX_RATE + wage.szepCard * (1 + KIVA_RATE + SZJA_RATE) + wage.feeMonthly + wage.feeHourly * month.workdays * 8;
    const d = dateDiffInDays_(from, until) + 1;
    let ml = dateDiffInDays_(month.from, month.until) + 1;
    if (d < ml) {
        mw = mw * d / ml;
    }
    mw *= (1 - wage.discount);
    mw *= scale;
    const comment = wage.name + ', ' + wage.contractType + (wage.comment ? ', ' + wage.comment : '');
    let amount = Math.round(mw);
    return new BudgetRow(month.from, amount, wage.currency, project, comment, 'WAGE', wage.payer);
}

