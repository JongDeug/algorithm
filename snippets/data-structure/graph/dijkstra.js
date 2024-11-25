class MinHeap {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  // enqueue
  // dequeue
  // bubbleUp
  // bubbleDown
  // swap

  enqueue(value, priority) {
    // 말단으로 넣고 올림
    this.values.push({ value, priority });
    this.bubbleUp();
  }

  dequeue() {
    // 상단에 있는 놈 뺄거임. 상단 하단 swap 후 내림
    if (this.size() === 0) return null;
    this.swap(0, this.size() - 1);
    const removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2); // 주의

      if (this.values[parentIdx].priority <= this.values[currentIdx].priority)
        break; // 홀리 몰리
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }

  bubbleDown() {
    let currentIdx = 0;

    // 왼쪽 자식 체크
    while (currentIdx * 2 + 1 < this.size()) {
      let leftIdx = currentIdx * 2 + 1;
      let rightIdx = currentIdx * 2 + 2;
      let swapIdx =
        rightIdx < this.size() && // 오른쪽 자식 체크, 없으면 왼쪽이 들어가도록 그 다음 로직 구현
        this.values[rightIdx].priority < this.values[leftIdx].priority
          ? rightIdx
          : leftIdx; // false

      if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
        break;
      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }
}

function solution(graph, start) {
  // M. distance, visited 초기화
  let distance = {};
  let visited = new Set();
  for (const key in graph) {
    distance[key] = Infinity;
  }

  distance[start] = 0;
  const queue = new MinHeap();
  queue.enqueue(start, 0);

  // I. 최단 경로 기록
  const paths = { [start]: [start] };

  // I. while 반복문, 큐
  while (queue.size() > 0) {
    const { value: node, priority } = queue.dequeue();
    visited.add(node);

    // I. distance 값보다 priority(경로 값)이 크면 쓸모 없음
    if (distance[node] < priority) continue;

    for (const neighbor in graph[node]) {
      if (!visited.has(neighbor)) {
        const neighborWeight = graph[node][neighbor];
        // i. 현재 노드 거리 + 갈 노드까지의 거리 < 원래 갈 노드 거리 => 초기화, 큐에 집어 넣음
        const candidate = distance[node] + neighborWeight;
        if (candidate < distance[neighbor]) {
          distance[neighbor] = candidate;
          // i. 최단 경로 기록
          paths[neighbor] = [...paths[node], neighbor];
          // console.log(paths);
          queue.enqueue(neighbor, candidate);
        }
      }
    }
  }

  return [distance, paths];
}

console.log(
  solution(
    {
      A: { B: 3, C: 4, D: 5 },
      B: { C: 2, D: 1 },
      C: { E: 2 },
      D: { C: 1, E: 1 },
      E: {},
    },
    "A"
  )
);

// console.log(solution({ A: { B: 9, C: 3 }, B: { A: 5 }, C: { B: 1 } }, "A"));
// console.log(solution({ A: { B: 1 }, B: { C: 5 }, C: { D: 1 }, D: {} }, "A"));
