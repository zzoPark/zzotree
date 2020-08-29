"use strict";

require("core-js/modules/es6.array.find");

var nums = [1, 2, 3];
var doubleNums = nums.map(function (e) {
  return e * 2;
});
var someNums = nums.some(function (e) {
  return e < 3;
});
var findNums = nums.find(function (e) {
  return e < 3;
});