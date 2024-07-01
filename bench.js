import dobbyscan from './index.js';
import points from 'all-the-cities';

const radius = 10;

console.log(`Running DBSCAN on ${points.length} points`);
console.time('Clustered in');

console.log(`Cluster radius: ${radius} km`);

const clusters = dobbyscan(points, radius, p => p.loc.coordinates[0], p => p.loc.coordinates[1]);

console.log(`${clusters.length} clusters found`);
console.timeEnd('Clustered in');
