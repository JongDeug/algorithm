// // [문제 이해하기]
// // 다익스트라 알고리즘을 구현해라.
// //
// // 입력: graph, start
// // 출력: 시작 노드부터, 각 노드까지 최소비용, 최단경로
// //
// // [문제 세분화]
// // I. 우선 순위 큐 구현
// // M. distance, visited
// // I. while 반복문, 큐
// // i. 현재 노드 거리 + 노드까지의 거리 < distance 노드 거리 => 초기화, 큐에 집어 넣음
// class MinHeap {
//   constructor() {
//     this.values = [];
//   }

//   size() {
//     return this.values.length;
//   }

//   // enqueue
//   // dequeue
//   // bubbleUp
//   // bubbleDown
//   // swap

//   enqueue(value, priority) {
//     // 말단으로 넣고 올림
//     this.values.push({ value, priority });
//     this.bubbleUp();
//   }

//   dequeue() {
//     // 상단에 있는 놈 뺄거임. 상단 하단 swap 후 내림
//     if (this.size() === 0) return null;
//     this.swap(0, this.size() - 1);
//     const removed = this.values.pop();
//     this.bubbleDown();
//     return removed;
//   }

//   swap(a, b) {
//     [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
//   }

//   bubbleUp() {
//     let currentIdx = this.size() - 1;

//     while (currentIdx > 0) {
//       let parentIdx = Math.floor((currentIdx - 1) / 2); // 주의

//       if (this.values[parentIdx].priority <= this.values[currentIdx].priority)
//         break; // 홀리 몰리
//       this.swap(currentIdx, parentIdx);
//       currentIdx = parentIdx;
//     }
//   }

//   bubbleDown() {
//     let currentIdx = 0;

//     // 왼쪽 자식 체크
//     while (currentIdx * 2 + 1 < this.size()) {
//       let leftIdx = currentIdx * 2 + 1;
//       let rightIdx = currentIdx * 2 + 2;
//       let swapIdx =
//         rightIdx < this.size() && // 오른쪽 자식 체크, 없으면 왼쪽이 들어가도록 그 다음 로직 구현
//         this.values[rightIdx].priority < this.values[leftIdx].priority
//           ? rightIdx
//           : leftIdx; // false

//       if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
//         break;
//       this.swap(currentIdx, swapIdx);
//       currentIdx = swapIdx;
//     }
//   }
// }

// function solution(graph, start) {
//   // M. distance, visited 초기화
//   let distance = {};
//   let visited = new Set();
//   for (const key in graph) {
//     distance[key] = Infinity;
//   }

//   distance[start] = 0;
//   const queue = new MinHeap();
//   queue.enqueue(start, 0);

//   // I. 최단 경로 기록
//   const paths = { [start]: [start] };

//   // I. while 반복문, 큐
//   while (queue.size() > 0) {
//     const { value: node, priority } = queue.dequeue();
//     visited.add(node);

//     // I. distance 값보다 priority(경로 값)이 크면 쓸모 없음
//     if (distance[node] < priority) continue;

//     for (const neighbor in graph[node]) {
//       if (!visited.has(neighbor)) {
//         const neighborWeight = graph[node][neighbor];
//         // i. 현재 노드 거리 + 갈 노드까지의 거리 < 원래 갈 노드 거리 => 초기화, 큐에 집어 넣음
//         const candidate = distance[node] + neighborWeight;
//         if (candidate < distance[neighbor]) {
//           distance[neighbor] = candidate;
//           // i. 최단 경로 기록
//           paths[neighbor] = [...paths[node], neighbor];
//           // console.log(paths);
//           queue.enqueue(neighbor, candidate);
//         }
//       }
//     }
//   }

//   return [distance, paths];
// }

// console.log(solution({ A: { B: 9, C: 3 }, B: { A: 5 }, C: { B: 1 } }, "A"));
// console.log(solution({ A: { B: 1 }, B: { C: 5 }, C: { D: 1 }, D: {} }, "A"));

// [문제 이해하기] => 후후후후후후
// 다익스트라 알고리즘을 구현

// [입력]: object(인접 리스트 객체), string(시작 노드)
// [출력]: 객체 배열(각 노드까지 최소비용 + 최단경로)

// [접근법]
// kruskal 알고리즘(간선 정렬 후 뽑아씀)이랑 차이가 나는게
// dijkstra 알고리즘은 시작 정점이 정해져 있기 때문에 한 정점에서부터 시작함

class MinHeap {
  constructor() {
    this.values = [];
  }

  // size
  // enqueue
  // bubbleUp
  // dequeue
  // bubbleDown

  size() {
    return this.values.length;
  }

  // 제일 마지막에 삽입, up
  enqueue(node, weight) {
    this.values.push([node, weight]);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.values[currentIdx][1] >= this.values[parentIdx][1]) {
        break;
      }

      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }

  // swap 후, 제거 후 저장, bubbleDown
  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.values.pop();

    this.swap(this.size() - 1, 0);
    let removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  bubbleDown() {
    let currentIdx = 0;

    while (currentIdx * 2 + 1 < this.size()) {
      let leftIdx = currentIdx * 2 + 1;
      let rightIdx = currentIdx * 2 + 2;
      // rightIdx check valid
      // left, right 값 체킹 해야 됨.
      // 너무 길면 다른 로직 사용
      let swapIdx =
        rightIdx >= this.size()
          ? leftIdx
          : this.values[leftIdx][1] < this.values[rightIdx][1]
          ? leftIdx
          : rightIdx;

      // 자식이 부모보다 작으면
      if (this.values[currentIdx][1] <= this.values[swapIdx][1]) {
        break;
      }

      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }

  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[a], this.values[b]];
  }
}

// [문제 세분화]
// 우선순위 큐 구현(출발, 목표, 가중치)
// 다익스트라 알고리즘 구현
// distance, previous, 큐 세팅(시작, 가중치 0)
// **while**
// 우선순위 큐에서 뽑음 [출발, 가중치]
// for (이웃(목표정점) of 출발정점)
//  필요하면 set으로 만든 visited 활용
//  distance[목표정점] 보다 {distance[출발정점](큐에서 뽑은 가중치) + 목표정점 가중치}가 더 작으면
//      distance[목표정점]을 초기화하고,
//      우선순위 큐에 distance[출발정점] + 목표정점 가중치를 삽입해라.

// [틀렸던 고민, 핵심]
// 큐에 간선의 가중치만 넣는게 아니라 distance[출발정점] + 목표정점 가중치를 넣어야함
function solution(graph, start) {
  const distance = {};
  const previous = { [start]: [start] };
  const heap = new MinHeap();

  // 초기화
  for (const node in graph) {
    distance[node] = Infinity;
    // previous[node] = node;
  }
  distance[start] = 0;
  heap.enqueue(start, 0);

  // 다익스트라
  while (heap.size()) {
    const [from, weight] = heap.dequeue();

    for (const neighbor in graph[from]) {
      const candidate = weight + graph[from][neighbor];
      if (candidate < distance[neighbor]) {
        distance[neighbor] = candidate;
        // previous[neighbor] = from;
        previous[neighbor] = [...previous[from], neighbor];
        heap.enqueue(neighbor, candidate);
      }
    }
  }

  //   let path = {};
  //   for (const node in previous) {
  //     path[node] = [node];

  //     if (node !== "A") {
  //       let current = previous[node];
  //       while (current) {
  //         path[node].push(current);
  //         if (current === start) break;
  //         current = previous[current];
  //       }
  //     }
  //     path[node].reverse();
  //   }

  return [distance, previous];
}

// console.log(solution({ A: { B: 1 }, B: { C: 5 }, C: { D: 1 }, D: {} }, "A"));
// console.log(solution({ A: { B: 9, C: 3 }, B: { A: 5 }, C: { B: 1 } }, "A"));
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
