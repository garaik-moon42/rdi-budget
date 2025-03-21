function getSheetData_(sheetName: string):any[][] {
   // const sheet: Sheet | null = SpreadsheetApp.openById("1Yhp-CRkL6rOSdPtFp_oOEPUkmKYyb9ooS6cBuNg_ISg").getSheetByName(sheetName);
   const sheet: Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (sheet !== null) {
    return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  }
  throw "ILLEGAL STATE: there is no sheet named '" + sheetName + "'";
}

function mapContractType_(ct: any):string {
  switch (ct) {
    case "alvállalkozó":
      return "SUBCONTRACTOR";
    case "megbízásos":
      return "WORK_CONTRACT";
    case "iskolaszövetkezet":
      return "STUDENT_COOPERATION";
    default: 
      return "EMPLOYEE";
  }
}

// Utility methods to convert data to JSON
function exportEmployees() {
  let data:any[][] = getSheetData_("EMPLOYEES");
  if (data != null) {
    return data.map(function(row) {
      return {
        name: row[1],
        email: row[2],
        from: row[3],
        until: row[4],
        pmId: row[5],
        bdgId: row[0],
        //wages: wagesMap[row[1]]
      };
    });
  }
  throw "ILLEGAL STATE: no data found on EMPLOYEES sheet."
}
