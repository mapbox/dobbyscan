
import Flatbush from 'flatbush';
import {within} from 'geoflatbush';

export default function dobbyscan(points, radius, getLng = p => p[0], getLat = p => p[1]) {

    const len = points.length;

    const coords = new Float64Array(len * 2);
    for (let i = 0; i < len; i++) {
        const p = points[i];
        coords[2 * i] = getLng(p);
        coords[2 * i + 1] = getLat(p);
    }

    const index = new Flatbush(len);
    for (let i = 0; i < coords.length; i += 2) index.add(coords[i], coords[i + 1]);
    index.finish();

    const clusters = [];
    const clustered = new Uint8Array(len);

    const queue = [];
    let queueLen = 0;

    function processUnclustered(i) {
        if (!clustered[i]) {
            clustered[i] = 1;
            queue[queueLen++] = i;
        }
    }

    for (let i = 0; i < len; i++) {
        if (clustered[i]) continue;

        const cluster = [];
        queue[0] = i;
        queueLen = 1;
        clustered[i] = 1;

        while (queueLen > 0) {
            const j = queue[--queueLen];
            cluster.push(points[j]);

            within(index, coords[2 * j], coords[2 * j + 1], radius, processUnclustered);
        }

        clusters.push(cluster);
    }

    return clusters;
}
