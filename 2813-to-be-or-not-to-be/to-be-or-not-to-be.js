/**
 * @param {*} val
 * @return {Object}
 */
var expect = function(val) {
  return {
    toBe: function(otherVal) {
      if (val === otherVal) return true;
      throw new Error("Not Equal");
    },
    notToBe: function(otherVal) {
      if (val !== otherVal) return true;
      throw new Error("Equal");
    }
  };
};
