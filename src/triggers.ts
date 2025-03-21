import SheetsOnEdit = GoogleAppsScript.Events.SheetsOnEdit;
import SheetsRange = GoogleAppsScript.Spreadsheet.Range;
import SheetsOnOpen = GoogleAppsScript.Events.SheetsOnOpen;

function onEdit(e: SheetsOnEdit) {
  if (!e.range.isBlank()) {
    let sheet:Sheet = e.source.getActiveSheet();
    if ('EMPLOYEES' === sheet.getName()) {
      let rowIndex = e.range.getRowIndex();
      let numRows = e.range.getNumRows();
      for (let i = 0; i < numRows; ++i) {
        checkForId(sheet, rowIndex + i);
      }
    }
  }
}

function checkForId(sheet: Sheet, rowIndex: number):void {
  let r:SheetsRange = sheet.getRange(rowIndex, 1);
  if (r.isBlank()) {
    allocateIdFor(r);
  }
}

function allocateIdFor(r: SheetsRange):void {
  let configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CONFIG');
  if (configSheet !== null) {
    let nextIdCell = configSheet.getRange('B5');
    let nextId = Math.max(nextIdCell.getValue(), configSheet.getRange('C5').getValue());
    nextIdCell.setValue(nextId + 1);
    r.setValue(nextId);
  }
}

function onOpen(e: SheetsOnOpen) {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('RDI').addItem('Adatok frissítése', 'refreshData_').addToUi();
}

function refreshData_() {
  let configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CONFIG');
  if (configSheet !== null) {
    let gr = configSheet.getRange('RNG_GEN');
    gr.setValue(gr.getValue() + 1);
  }
}
