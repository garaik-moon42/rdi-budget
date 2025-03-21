/**
 * Gives back the content of the given sheet a JS array.
 * @param {Sheet} sheet Sheet to return as javascript array.
 */
function sheetToArray(sheet: Sheet): any[] {
    let range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
    let data = range.getValues();
    let header = data.splice(0, 1)[0].map(function(value) {
        return value.split('.');
    });
    let a:any[] = [], o, p, i, j, h: any;
    data.forEach(function(row, idx) {
        o = {
            rownum: (idx + 2)
        };
        for (i = 0; i < header.length; ++i) {
            h = header[i];
            p = o;
            for (j = 0; j < h.length - 1; ++j) {
                if (p[h[j]] == undefined) {
                    p[h[j]] = isInteger_(parseInt(h[j + 1], 10)) ? [] : {};
                }
                // @ts-ignore
                p = p[h[j]];
            }
            if (row[i] != null && row[i] !== "") {
                p[h[j]] = row[i];
            }
        }
        a.push(o);
    });
    return a;
}

/**
 * Gives back the content of the given sheet as JSON.
 * @param {Sheet} sheet Sheet to return as JSON.
 * @return {String} Sheet data as JSON string.
 */
function sheetToJSON(sheet: Sheet): string {
    let data = sheetToArray(sheet);
    return JSON.stringify({
        name: sheet.getName(),
        content: data
    });
}

function isInteger_(value: any):boolean {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
}
