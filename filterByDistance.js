'use strict';

function filterByDistance(array) {
  var sorted = array.sort(function (a, b) {
    if (a.location.distance > b.location.distance) {
      return 1;
    }
    if (a.location.distance < b.location.distance) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return sorted;
}

module.exports = filterByDistance;