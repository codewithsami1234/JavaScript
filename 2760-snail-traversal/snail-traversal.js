/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function(rowsCount, colsCount) {
    const nums = this;

    if (rowsCount * colsCount !== nums.length) return [];

    const result = Array.from({ length: rowsCount }, () => Array(colsCount).fill(0));

    let index = 0;

    for (let col = 0; col < colsCount; col++) {
        if (col % 2 === 0) {
            // Even column → top to bottom
            for (let row = 0; row < rowsCount; row++) {
                result[row][col] = nums[index++];
            }
        } else {
            // Odd column → bottom to top
            for (let row = rowsCount - 1; row >= 0; row--) {
                result[row][col] = nums[index++];
            }
        }
    }

    return result;
};

/**
 * Example:
 * const arr = [1,2,3,4];
 * console.log(arr.snail(1,4)); // [[1,2,3,4]]
 */
