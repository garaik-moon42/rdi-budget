/**
 * Params:
 *   password: Password for using the API (can be configured on CONFIG sheet)
 *   entity: Name of the entity to get list of. Possible values:
 *     ["employee"]
 */
import AppsScriptHttpRequestEvent = GoogleAppsScript.Events.AppsScriptHttpRequestEvent;
import TextOutput = GoogleAppsScript.Content.TextOutput;

interface PostParameters {
  password: string;
  entity: string;
}

function doPost(r: AppsScriptHttpRequestEvent): TextOutput {
  let params = r.parameter;
  if (checkPassword_(params.password)) {
    if ("employee" == params.entity) {
      return output_(exportEmployees());
    }
    else {
      return error_("BAD_REQUEST", "Please specify which entity you want to get.");
    }
  }
  else {
    return error_("UNAUTHORIZED", "Please provide proper password to use this service.");
  }
}

function output_(obj: any): TextOutput {
  return ContentService.createTextOutput(JSON.stringify(obj));
}

function error_(err: any, msg: string): TextOutput {
  return output_({
    error: err,
    message: msg
  });
}

function checkPassword_(pwd: string):boolean {
  let config: Sheet | null = SpreadsheetApp.openById("1Yhp-CRkL6rOSdPtFp_oOEPUkmKYyb9ooS6cBuNg_ISg").getSheetByName("CONFIG");
  if (config != null) {
    let apiPwd = config.getRange("B9").getValue();
    return apiPwd == pwd;
  }
  return false;
}
