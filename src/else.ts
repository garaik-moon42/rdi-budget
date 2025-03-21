/**
 * Returns the cartesian product of the given ranges.
 *
 * @param {range} range1 The first range to get the product of.
 * @param {range} range2 The second range to get the product of.
 * @param {number} range1Headers Number of header rows of the first range (0 by default).
 * @param {number} range2Headers Number of header rows of the second range (0 by default).
 * @return The cartesian product of the two ranges.
 * @customfunction
 */
function CART_PROD(range1: any[][], range2:any[][], range1Headers: number, range2Headers: number) {
  let p:any[][] = [];
  for (let i = (range1Headers || 0); i < range1.length; ++i) {
    for (let j = (range2Headers || 0); j < range2. length; ++j) {
      p.push(range1[i].concat(range2[j]));
    }
  }
  return p;
}

/**
 * Returns the by-date-interval join of the two given ranges. 
 * Two rows of the ranges are joined only if their data ranges have intersection.
 *
 * @param {range} range1 The first range to get the join of.
 * @param {range} fromIndex1 Index of the "from" value in the first range (0-based).
 * @param {range} untilIndex1 Index of the "until" value in the first range (0-based).
 * @param {range} range2 The second range to get the join of.
 * @param {range} fromIndex2 Index of the "from" value in the second range (0-based).
 * @param {range} untilIndex2 Index of the "until" value in the second range (0-based).
 * @param {number} range1Headers Number of header rows of the first range (0 by default).
 * @param {number} range2Headers Number of header rows of the second range (0 by default).
 * @return The date interval join of the two ranges. The intersection of the date intervals will be appended to each row at their ends.
 * @customfunction
 */
function DATE_JOIN(
    range1: any[][],
    fromIndex1: number,
    untilIndex1: number,
    range2: any[][],
    fromIndex2: number,
    untilIndex2: number,
    range1Headers: number,
    range2Headers: number):any[][] {
  // ToDo: provide parameter checking
  var i, j, is;
  var r = [];
  for (i = (range1Headers || 0); i < range1.length; ++i) {
    for (j = (range2Headers || 0); j < range2.length; ++j) {
      is = intersect_(range1[i][fromIndex1], range1[i][untilIndex1], range2[j][fromIndex2], range2[j][untilIndex2]);
      if (is) {
        r.push(range1[i].concat(range2[j]).concat(is));
      }
    }
  }
  return r;
}
