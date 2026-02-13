import { test, expect, describe } from 'bun:test';
import { KDTree } from '../src/kdtree.ts';

describe('KDTree', () => {
  test('finds exact match', () => {
    const points = new Float32Array([
      0, 0, 0,
      1, 0, 0,
      0.5, 0.5, 0.5,
    ]);
    const tree = new KDTree(points, 3);
    const result = tree.nearest([0.5, 0.5, 0.5]);
    expect(result.index).toBe(2);
    expect(result.distance).toBeCloseTo(0, 5);
  });

  test('finds nearest neighbor', () => {
    const points = new Float32Array([
      0, 0, 0,     // black
      1, 0, 0,     // white
      0.6, 0.2, 0.1, // reddish
    ]);
    const tree = new KDTree(points, 3);
    // Query close to reddish
    const result = tree.nearest([0.62, 0.22, 0.12]);
    expect(result.index).toBe(2);
    expect(result.distance).toBeLessThan(0.05);
  });

  test('handles single point', () => {
    const points = new Float32Array([0.5, 0.5, 0.5]);
    const tree = new KDTree(points, 1);
    const result = tree.nearest([0, 0, 0]);
    expect(result.index).toBe(0);
  });

  test('handles two points', () => {
    const points = new Float32Array([
      0, 0, 0,
      1, 1, 1,
    ]);
    const tree = new KDTree(points, 2);
    const result = tree.nearest([0.1, 0.1, 0.1]);
    expect(result.index).toBe(0);
  });

  test('nearestN returns correct count', () => {
    const points = new Float32Array([
      0, 0, 0,
      0.1, 0.1, 0.1,
      0.5, 0.5, 0.5,
      0.9, 0.9, 0.9,
      1, 1, 1,
    ]);
    const tree = new KDTree(points, 5);
    const results = tree.nearestN([0.05, 0.05, 0.05], 3);
    expect(results.length).toBe(3);
    // Should be sorted by distance
    expect(results[0]!.distance).toBeLessThanOrEqual(results[1]!.distance);
    expect(results[1]!.distance).toBeLessThanOrEqual(results[2]!.distance);
  });

  test('nearestN finds closest points', () => {
    const points = new Float32Array([
      0, 0, 0,
      0.1, 0.1, 0.1,
      0.5, 0.5, 0.5,
      0.9, 0.9, 0.9,
      1, 1, 1,
    ]);
    const tree = new KDTree(points, 5);
    const results = tree.nearestN([0.05, 0.05, 0.05], 2);
    expect(results.length).toBe(2);
    // The two closest should be index 0 and 1
    const indices = results.map((r) => r.index).sort();
    expect(indices).toEqual([0, 1]);
  });

  test('works with many points', () => {
    const count = 1000;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      points[i] = Math.random();
    }
    const tree = new KDTree(points, count);

    const query: [number, number, number] = [0.5, 0.5, 0.5];
    const result = tree.nearest(query);

    // Verify by brute force
    let bestDist = Infinity;
    let bestIdx = -1;
    for (let i = 0; i < count; i++) {
      const dl = query[0] - points[i * 3]!;
      const da = query[1] - points[i * 3 + 1]!;
      const db = query[2] - points[i * 3 + 2]!;
      const dist = Math.sqrt(dl * dl + da * da + db * db);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    expect(result.index).toBe(bestIdx);
    expect(result.distance).toBeCloseTo(bestDist, 10);
  });
});
