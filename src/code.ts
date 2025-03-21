import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

/**
 * Calculates and returns the monthly incomes of the projects.
 *
 * @param {range} monthsData Months for which the incomes should be calculated. The range should contain three columns: first day of the month, last day of the month and number of workdays in that month.
 * @return The calculated incomes.
 * @customfunction
 */
function MONTHLY_INCOMES(monthsData:any[][]) {
  return monthlyIncomes_(
    monthsData.map( (r: any[]) => new Month(r) ),
    getSheetData_("PROJECT_INCOMES").map( (r: any[]) => new ProjectIncome(r) )
  ).map(toArray);
}

function MONTHLY_COSTS(monthsData:any[][]) {
  return monthlyIncomes_(
      monthsData.map((r: any[]) => new Month(r)),
      getSheetData_("COSTS").map( (r: any[]) => new ProjectIncome(r) )
  ).map(toArray);
}

function analysisComparator_(a: any[], b: any[]):number {
    if (a[0] < b[0]) {
      return - 1;
    }
    else if (a[0] > b[0]) {
      return 1;
    }
    else if (a[4] < b[4]) {
      return - 1;
    }
    else if (a[4] > b[4]) {
      return 1;
    }
    else {
      return 0;
    }
}

function currencyConverter_(r: any[]) {
    // converting EUR into HUF
    let n = r.slice(); // copying the row
    if (n[2] === 'EUR') {
      n[2] = 'HUF';
      n[1] *= 400;
    }
    if (n[2] === 'USD') {
      n[2] = 'HUF';
      n[1] *= 365;
    }
    if (n[2] === 'GBP') {
      n[2] = 'HUF';
      n[1] *= 475;
    }
    return n;
}

function PROJECT_ANALYSIS(months: any[], gen: number):any[][] {
  let mws = MONTHLY_WAGES(months).map((r) => [r[0], -r[1], r[2], r[3], r[4], r[5], r[6]] );
  let mis = MONTHLY_INCOMES(months);
  let mcs = MONTHLY_COSTS(months).map((r) => [r[0], -r[1], r[2], r[3], r[4], 'COST', r[6]] );
  return mws.concat(mis).concat(mcs).map(currencyConverter_).sort(analysisComparator_);
}
