'use strict';

function getMilesFromMeters(result) {
  return (result *= 0.000621371192).toFixed(2) + ' miles away';
}

module.exports = getMilesFromMeters;