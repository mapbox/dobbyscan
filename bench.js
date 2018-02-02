'use strict';

var dobbyscan = require('./');

var points = require("all-the-cities");
var radius = 10;

console.log(`Running DBSCAN on ${points.length} points`);
console.time('Clustered in');

console.log(`Cluster radius: ${radius} km`);

var clusters = dobbyscan(points, radius, (p) => p.lon, (p) => p.lat);

console.log(`${clusters.length} clusters found`);
console.timeEnd('Clustered in');
