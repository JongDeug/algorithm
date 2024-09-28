// [문제 이해하기]
// K 이하의 경로가 몇 개인지 확인해서 반환하는 함수를 구현해라.
//
// [문제 풀이 방법]
// 1. Dijkstra
// 2. Kruskal => MST, 이걸로 풀 수 있을까
//
// [문제 세분화]
// I. 우선 순위 큐 구현 (추가, 삭제 logN)
// M. distance, visited
// I. while (큐 돌면서) => 다한 뒤 distance 에서 K이하인 것 반환

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class MinHeap {
  constructor() {
    this.values = [];
  }

  // swap
  // size
  // enqueue
  // dequeue
  // bubbleUp
  // bubbleDown

  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  size() {
    return this.values.length;
  }

  enqueue(node) {
    this.values.push(node);
    this.bubbleUp();
  }

  dequeue() {
    this.swap(0, this.size() - 1);
    const removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.values[currentIdx].priority >= this.values[parentIdx].priority)
        break;
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }

  bubbleDown() {
    let currentIdx = 0;
    // 왼쪽 검사
    while (currentIdx * 2 + 1 < this.size()) {
      let leftIdx = currentIdx * 2 + 1;
      let rightIdx = currentIdx * 2 + 2;
      // 오른쪽 검사
      let swapIdx =
        rightIdx < this.size() && // 여기가 핵심이구만
        this.values[rightIdx].priority < this.values[leftIdx].priority
          ? rightIdx
          : leftIdx;

      if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
        break;
      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }
}

function solution(N, road, K) {
  // M. distance, adjacencyList, visited;
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const visited = new Set();
  const adjacencyList = {};
  for (const [u, v, w] of road) {
    if (!adjacencyList[u]) adjacencyList[u] = [];
    if (!adjacencyList[v]) adjacencyList[v] = [];
    adjacencyList[u].push({ node: v, weight: w });
    adjacencyList[v].push({ node: u, weight: w });
  }

  distance[1] = 0;
  visited.add(1);

  const queue = new MinHeap();
  queue.enqueue(new Node(1, 0));

  // I. while (큐 돌면서) => 다한 뒤 distance 에서 K이하인 것 반환
  while (queue.size() > 0) {
    const { value: node } = queue.dequeue();
    visited.add(node);

    for (const neighbor of adjacencyList[node]) {
      if (!visited.has(neighbor.node)) {
        const candidate = distance[node] + neighbor.weight;
        if (candidate < distance[neighbor.node]) {
          distance[neighbor.node] = candidate;
          queue.enqueue(new Node(neighbor.node, candidate));
        }
      }
    }
  }

  let answer = 0;
  for (let i = 1; i <= N; i++) {
    if (distance[i] <= K) answer++;
  }

  return answer;
}

console.log(
  solution(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3,
  ),
);
