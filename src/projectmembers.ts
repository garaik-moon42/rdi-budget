
interface PmProjects {
  [index: string]: number
}

interface PmMembers {
  [index: string]: PmProjects
}

interface PmMonths {
  [index: string]: PmMembers
}

function getProjectMembers2():PmMonths {
  const MONTH_ROW = 3;
  const FIRST_DATA_COLUMN = 4;
  let pmSheet:Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PROJECT_MEMBERS");
  if (pmSheet !== null) {
    let pmData:any[][] = pmSheet.getRange(3, 1, pmSheet.getLastRow() - (MONTH_ROW - 1), pmSheet.getLastColumn()).getValues();
    let months:Date[] = pmData[0].slice(FIRST_DATA_COLUMN - 1); // the first row contains the months
    pmData = pmData.slice(1); // we do not need the first row now

    let pmMonths:PmMonths = {};

    months.forEach(function (month, mi) {
      let pmMembers:PmMembers = pmMonths[getMonthKey_(month)] = {};
      pmData
          .filter(function (row) { // keeping those rows only having any positive number for the corresponding month
            return isPositiveNumber_(row[mi + FIRST_DATA_COLUMN - 1]);
          })
          .forEach(function (row) {
            let member:string = row[0];
            let plan:string = row[1]; // not used at the moment
            let project:string = row[2];
            let pmProjects:PmProjects = pmMembers[member] || (pmMembers[member] = {});
            pmProjects[project] = row[mi + FIRST_DATA_COLUMN - 1] as number;
          });
    });
    return pmMonths;
  }
  else {
    throw "INVALID STATE: the returned sheet is null"
  }
}

function isPositiveNumber_(n:any):boolean {
  return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
}

function getMonthKey_(month: Date):string {
  let k:string = month.getFullYear() + ".";
  let m:number = month.getMonth() + 1;
  k += (m < 10 ? ("0" + m) : m);
  return k;
}

