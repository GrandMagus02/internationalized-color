/**
 * A 3-dimensional k-d tree for fast nearest-neighbor search in OkLab space.
 * Each point is [l, a, b] and carries an associated index back into the name array.
 */

interface KDNode {
  point: [number, number, number];
  index: number;
  left: KDNode | null;
  right: KDNode | null;
  axis: number;
}

export interface NearestResult {
  index: number;
  distance: number;
}

export class KDTree {
  #root: KDNode | null;

  constructor(points: Float32Array, count: number) {
    const items: { point: [number, number, number]; index: number }[] = [];
    for (let i = 0; i < count; i++) {
      const offset = i * 3;
      items.push({
        point: [points[offset]!, points[offset + 1]!, points[offset + 2]!],
        index: i,
      });
    }
    this.#root = this.#build(items, 0);
  }

  #build(
    items: { point: [number, number, number]; index: number }[],
    depth: number,
  ): KDNode | null {
    if (items.length === 0) return null;

    const axis = depth % 3;
    items.sort((a, b) => a.point[axis]! - b.point[axis]!);
    const mid = items.length >> 1;

    return {
      point: items[mid]!.point,
      index: items[mid]!.index,
      axis,
      left: this.#build(items.slice(0, mid), depth + 1),
      right: this.#build(items.slice(mid + 1), depth + 1),
    };
  }

  /** Find the single nearest neighbor to the query point. */
  nearest(query: [number, number, number]): NearestResult {
    let bestDist = Infinity;
    let bestIndex = -1;

    const search = (node: KDNode | null) => {
      if (!node) return;

      const dist = sqDist(query, node.point);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = node.index;
      }

      const axis = node.axis;
      const diff = query[axis]! - node.point[axis]!;
      const near = diff <= 0 ? node.left : node.right;
      const far = diff <= 0 ? node.right : node.left;

      search(near);

      // Only search the far branch if the splitting plane is closer than the current best
      if (diff * diff < bestDist) {
        search(far);
      }
    };

    search(this.#root);

    return { index: bestIndex, distance: Math.sqrt(bestDist) };
  }

  /** Find the N nearest neighbors to the query point. */
  nearestN(query: [number, number, number], n: number): NearestResult[] {
    // Max-heap of size n (worst = first)
    const heap: { index: number; dist: number }[] = [];

    const search = (node: KDNode | null) => {
      if (!node) return;

      const dist = sqDist(query, node.point);

      if (heap.length < n) {
        heap.push({ index: node.index, dist });
        heapUp(heap, heap.length - 1);
      } else if (dist < heap[0]!.dist) {
        heap[0] = { index: node.index, dist };
        heapDown(heap, 0, heap.length);
      }

      const axis = node.axis;
      const diff = query[axis]! - node.point[axis]!;
      const near = diff <= 0 ? node.left : node.right;
      const far = diff <= 0 ? node.right : node.left;

      search(near);

      const maxDist = heap.length < n ? Infinity : heap[0]!.dist;
      if (diff * diff < maxDist) {
        search(far);
      }
    };

    search(this.#root);

    // Extract sorted results
    const results: NearestResult[] = [];
    for (const item of heap) {
      results.push({ index: item.index, distance: Math.sqrt(item.dist) });
    }
    results.sort((a, b) => a.distance - b.distance);
    return results;
  }
}

function sqDist(a: [number, number, number], b: [number, number, number]): number {
  const dl = a[0]! - b[0]!;
  const da = a[1]! - b[1]!;
  const db = a[2]! - b[2]!;
  return dl * dl + da * da + db * db;
}

// Max-heap helpers (by dist, largest at index 0)
function heapUp(heap: { dist: number }[], i: number) {
  while (i > 0) {
    const parent = (i - 1) >> 1;
    if (heap[i]!.dist > heap[parent]!.dist) {
      [heap[i], heap[parent]] = [heap[parent]!, heap[i]!];
      i = parent;
    } else {
      break;
    }
  }
}

function heapDown(heap: { dist: number }[], i: number, size: number) {
  while (true) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size && heap[left]!.dist > heap[largest]!.dist) largest = left;
    if (right < size && heap[right]!.dist > heap[largest]!.dist) largest = right;
    if (largest !== i) {
      [heap[i], heap[largest]] = [heap[largest]!, heap[i]!];
      i = largest;
    } else {
      break;
    }
  }
}
