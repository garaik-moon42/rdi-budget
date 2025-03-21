function dateDiffInDays_(a: Date, b: Date):number {
    // Discard the time and time-zone information.
    let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / 86400000);
}

/**
 * Calculates the intersection of the two given date intervals.
 * @param {Date} from1 Start of the first interval.
 * @param {Date} until1 End of the first interval.
 * @param {Date} from2 Start of the second interval.
 * @param {Date} until2 End of the second interval.
 * @return {Date[]|null} The intersection of the two intervals as a date array or null if there is no intersection.
 */
function intersect_(from1: Date, until1: Date, from2: Date, until2: Date):[Date, Date] | null {
    if (from1 <= until2 && until1 >= from2) {
        return [from1 > from2 ? from1 : from2, until1 < until2 ? until1 : until2];
    }
    else {
        return null;
    }
}

function toArray(o:any):any[] {
    let a = [];
    for (let m in o) {
        a.push(o[m]);
    }
    return a;
}
