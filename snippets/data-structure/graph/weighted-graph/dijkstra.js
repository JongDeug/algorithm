// 우선 순위 큐를 사용해서 구현
// 1. 이진 힙으로 구현한 우선 순위 큐
// 2. 그냥 배열로 구현한 우선 순위 큐

import { WeightedGraph } from "./weighted-graph.js";
import { PriorityQueueHeap } from "../../queue/priority-queue/priority-queue-heap.js";
import { PriorityQueueBasic } from "../../queue/priority-queue/priority-queue-basic.js";

function dijkstra(graph, start, end) {
  let distances = {};
  let previous = {};
  let queue = new PriorityQueueHeap();
  // let queue = new PriorityQueueBasic();
  let visited = []; // 필요함.
  let result = [];

  // initial set
  for (let v in graph.adjacencyList) {
    if (v === start) {
      distances[v] = 0;
      visited.push(v);
      queue.enqueue(v, 0);
    } else {
      distances[v] = Infinity;
      queue.enqueue(v, Infinity);
    }
    previous[v] = null;
  }

  while (queue.values.length) {
    let smallest = queue.dequeue().value;

    if (smallest === end) {
      while (end) {
        result.push(end);
        end = previous[end];
      }
      break;
    }
    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor of graph.adjacencyList[smallest]) {
        // if (!visited.includes(neighbor.node)) {
        // calculate
        let candidate = distances[smallest] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          // updating new distance
          distances[neighbor.node] = candidate;
          // updating previous
          previous[neighbor.node] = smallest;
          // enqueue new priority
          queue.enqueue(neighbor.node, candidate);
          // }
        }
      }
      // visited.push(smallest); // 방문한 노드 => 이거 잘 못 사용하고 있는 것 같은데 .. 애초에 이게 없었는데
    }
  }
  // console.log(distances) // test
  return; // [문제 이해하기] => 코테 복습 큐
  // 벨만-포드 알고리즘 구현

  // [입력]: 3차원 배열 [[0번 노드 정보], [1번 노드 정보], [3번 노드 정보]], int(시작노드)
  // [출력]: 최단 거리를 담은 distance 배열, 최단 거리와 함께 관리할 직전 노드 predecessor 배열
  // 음의 사이클이 있으면 [-1] 반환

  // [접근법]
  // 다익스트라, 벨만-포드: 시작 노드에서 모든 노드의 최단 경로를 구하는 알고리즘
  // 다익스트라: 시작 노드에서 인접 노드의 간선을 우선 순위 큐에 넣어 해결
  // 벨만-포드: 시작 노드를 0으로 초기화 하고 노드 길이를 기준으로 모든 간선을 체킹해 해결함

  // [고민했던거]
  // 뭘 기준으로 도냐? -> 노드 기준 x -> 노드의 길이 기준 o, 인덱스 기준
  // 돌긴 도는데 시작 기준의 인접한 간선만 체킹해? 아니면 진짜 모든 간선을 체킹해? => 모든 간선, 그러기 위해서 distance를
  // INFINITY로 초기화하는 과정을 거쳐야 함.

  // [문제 세분화]
  // distance, predecessor 초기화
  // for문 노드의 길이만큼 돈다.
  //  모든 간선을 돌면서
  //      (distance[목표지점] > distance[출발지점] + 가중치) 라면
  //      distance, predecessor 초기화
  //      노드의 마지막 길이에 도달했는데도 초기화가 된다면 음의 사이클이 있음 [-1] 반환
  function solution(graph, source) {
    const n = graph.length;
    const distance = Array.from({ length: n }, () => Infinity);
    const predecessor = Array.from({ length: n }, () => null);
    // 간선 예쁘게 만들기
    const edges = graph.map((x, i) => x.map((y) => [i, ...y])).flat();

    distance[0] = 0;

    const bell = () => {
      // n-1, n
      for (let i = 1; i <= n; i++) {
        // 모든 간선을 돈다
        for (const [from, to, weight] of edges) {
          const candidate = distance[from] + weight;
          if (candidate < distance[to]) {
            if (i === n) return false;
            distance[to] = candidate;
            predecessor[to] = from;
          }
        }
      }

      return true;
    };

    return bell() ? [distance, predecessor] : [-1];
  }

  console.log(
    solution(
      [
        [
          [1, 4],
          [2, 3],
          [4, -6],
        ],
        [[3, 5]],
        [[1, 2]],
        [
          [0, 7],
          [2, 4],
        ],
        [[2, 2]],
      ],
      0
    )
  );

  console.log(
    solution(
      [
        [
          [1, 5],
          [2, -1],
        ],
        [[2, 2]],
        [[3, -2]],
        [
          [0, 2],
          [1, 6],
        ],
      ],
      0
    )
  );
  result.reverse().join(" ");
}

let graph = new WeightedGraph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");
//
// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("C", "F", 4);
// graph.addEdge("D", "F", 1);
// graph.addEdge("D", "E", 3);
// graph.addEdge("F", "E", 1);

// graph.addEdge('A', 'B', 3);
// graph.addEdge('A', 'C', 2);
// graph.addEdge('B', 'E', 1);
// graph.addEdge('C', 'D', 2);
// graph.addEdge('C', 'F', 4);
// graph.addEdge('D', 'F', 1);
// graph.addEdge('D', 'E', 3);
// graph.addEdge('F', 'E', 1);

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");

graph.addEdge("A", "C", 3);
graph.addEdge("A", "B", 1);
graph.addEdge("B", "D", 1);
graph.addEdge("C", "D", -5);
console.log(dijkstra(graph, "A", "D"));
