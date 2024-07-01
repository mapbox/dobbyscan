
import KDBush from 'kdbush';
import {around} from 'geokdbush';

export default function dobbyscan(points, radius, getLng = p => p[0], getLat = p => p[1]) {

    const index = new KDBush(points.length);
    for (const p of points) index.add(getLng(p), getLat(p));
    index.finish();

    const clusters = [];
    const clustered = new Uint8Array(points.length);

    function isUnclustered(i) {
        return !clustered[i];
    }

    for (let i = 0; i < points.length; i++) {
        if (clustered[i]) continue;

        const cluster = [];
        const searchQueue = [i];
        clustered[i] = 1;

        while (searchQueue.length) {
            const j = searchQueue.pop();
            const p = points[j];
            cluster.push(p);

            const unclusteredNeighbors = around(index, getLng(p), getLat(p), Infinity, radius, isUnclustered);

            for (const q of unclusteredNeighbors) {
                clustered[q] = 1;
                searchQueue.push(q);
            }
        }

        clusters.push(cluster);
    }

    return clusters;
}
