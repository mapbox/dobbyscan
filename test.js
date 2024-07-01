import test from 'node:test';
import assert from 'node:assert/strict';
import cities from 'all-the-cities';
import dobbyscan from './index.js';

test('clusters cities properly', () => {
    const clusters = dobbyscan(cities, 10, p => p.loc.coordinates[0], p => p.loc.coordinates[1]);

    assert.equal(clusters.length, 42045);
    assert.deepEqual(clusters[0].map(p => p.name), [
        'El Tarter', 'Encamp', 'Arinsal', 'Andorra la Vella',
        'Sant Julià de Lòria', 'la Massana', 'les Escaldes',
        'Ordino', 'Pas de la Casa', 'Canillo']);
});
