## dobbyscan [![Build Status](https://travis-ci.org/mapbox/dobbyscan.svg?branch=master)](https://travis-ci.org/mapbox/dobbyscan) [![Simply Awesome](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects)

A very fast density based clustering JavaScript library for geographic points. Implements a variation of [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN) with great circle distance metric.

### Example

```js
var clusters = dobbyscan(points, radius, (p) => p.lon, (p) => p.lat);
```

### API

#### dobbyscan(points, radius[, getLng, getLat])

Returns an array of clusters, where each cluster is an array of points (from the input array).

- `points`: an array of input points of an arbitrary format.
- `radius`: density clustering radius in kilometers.
- `getLng`: (optional) a function that returns longitude given an input point, `(p) => p[0]` by default.
- `getLat`: (optional) a function that returns latitude given an input point, `(p) => p[1]` by default.

### Performance

This library is incredibly fast — run `bench.js` to see it cluster 140k points in a couple seconds.

### Install

```
npm install dobbyscan
```
