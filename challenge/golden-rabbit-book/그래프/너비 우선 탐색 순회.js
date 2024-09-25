// [문제 이해하기]
// 그냥 그래프 줄테니까 너비 우선 탐색 해주라!
//
// [문제 세분화]
// I. 큐로 구현 FIFO
// I. 방문은 for 문에서 바로, why? 언제 방문한지 아니깐. => 꺼낼 때 방문하면 형제 노드들을 방문해버림, neighbor
//
class Queue {
  constructor() {
    this.values = [];
    this.front = -1;
    this.rear = -1;
  }

  enqueue(value) {
    this.values.push(value);
    this.rear++;
  }

  dequeue() {
    return this.values[++this.front];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

function solution(graph, start) {
  const queue = new Queue();
  const ans = [];
  // I. graph => adjList
  // const visited = {}; // => 이거를 Set 으로 해도 되겠네 ㄷㄷ
  const visited = new Set();
  const adjList = {};
  for (const [u, v] of graph) {
    if (!adjList[u]) adjList[u] = [];
    if (!adjList[v]) adjList[v] = [];

    adjList[u].push(v);
  }

  queue.enqueue(start);
  visited.add(start);

  while (!queue.isEmpty()) {
    const node = queue.dequeue(); // 그냥 배열 쓰면 N 임. => O(N^2) 은 막아야지!

    // if (node !== undefined) {
    ans.push(node);
    for (const neighbor of adjList[node] || []) {
      // => 와 쩐다 || 이렇게도 됨 ㄷㄷ
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    }
    // }
  }

  return ans;
}

console.log(
  solution(
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
    1,
  ),
);

// console.log(
//   solution(
//     [
//       [1, 2],
//       [1, 3],
//       [2, 4],
//       [2, 5],
//       [3, 6],
//       [3, 7],
//       [4, 8],
//       [5, 8],
//       [6, 9],
//       [7, 9],
//     ],
//     1,
//   ),
// );
