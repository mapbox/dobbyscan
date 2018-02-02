'use strict';

var test = require('tape').test;
var cities = require('all-the-cities');
var dobbyscan = require('./');

test('clusters cities properly', function (t) {
    var clusters = dobbyscan(cities, 10,
        function (p) { return p.lon; },
        function (p) { return p.lat; });

    t.equal(clusters.length, 42023);
    t.same(clusters[0].map(function (p) { return p.name; }), [
        'El Tarter', 'Encamp', 'Arinsal', 'Andorra la Vella',
        'Sant Julià de Lòria', 'la Massana', 'les Escaldes',
        'Ordino', 'Pas de la Casa', 'Canillo']);

    t.end();
});
