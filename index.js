'use strict';

var kdbush = require('kdbush');
var geokdbush = require('geokdbush');

module.exports = dobbyscan;

function defaultGetLng(p) { return p[0]; }
function defaultGetLat(p) { return p[1]; }

function dobbyscan(points, radius, getLng, getLat) {
    if (!getLng) getLng = defaultGetLng;
    if (!getLat) getLat = defaultGetLat;

    var pointIds = new Uint32Array(points.length);
    for (var i = 0; i < points.length; i++) {
        pointIds[i] = i;
    }

    function getLngI(i) { return getLng(points[i]); }
    function getLatI(i) { return getLat(points[i]); }

    var index = kdbush(pointIds, getLngI, getLatI);

    var clusters = [];
    var clustered = new Uint8Array(points.length);

    function isUnclustered(i) {
        return !clustered[i];
    }

    for (i = 0; i < points.length; i++) {
        if (clustered[i]) continue;

        var cluster = [];
        var searchQueue = [i];
        clustered[i] = 1;

        while (searchQueue.length) {
            var j = searchQueue.pop();
            cluster.push(points[j]);

            var unclusteredNeighbors = geokdbush.around(
                index, getLngI(j), getLatI(j), Infinity, radius, isUnclustered);

            for (var k = 0; k < unclusteredNeighbors.length; k++) {
                var q = unclusteredNeighbors[k];
                clustered[q] = 1;
                searchQueue.push(q);
            }
        }

        clusters.push(cluster);
    }

    return clusters;
}
