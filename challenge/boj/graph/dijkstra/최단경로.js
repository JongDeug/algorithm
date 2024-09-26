import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath =
  process.env.USERNAME !== "jongdeug"
    ? "/dev/stdin"
    : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 방향 그래프와 시작 정점을 줄테니 각 정점의 최단 경로를 반환해라.

// 입력: V(정점개수), E(간선개수), start(시작 정점), arrE(간선 정보)
// 출력: 1 ~ V 정점들의 distances

// 핵심
// 1. weight 10 이하의 자연수이므로, 우선순위큐를 활용한 다익스트라 구현 O(V*logV)

// [문제 세분화]
function parseInput(input) {
  let [first, second, ...edges] = input;
  let [V, E] = first.split(" ").map(Number);
  let start = Number(second);
  let graph = Array.from({ length: V + 1 }, () => []);
  edges.forEach((edge) => {
    let [u, v, w] = edge.split(" ").map(Number);
    graph[u].push({ node: v, weight: w });
  });
  return { V, graph, start };
}

// I. 우선 순위 큐 구현
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

// I. 최소 힙
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  enqueue(value, priority) {
    let node = new Node(value, priority);
    this.values.push(node);
    if (this.values.length !== 1) this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1;

    while (true) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);

      if (
        currentIdx < 0 ||
        currentIdx >= this.values.length ||
        parentIdx < 0 ||
        parentIdx >= this.values.length
      )
        break;

      let currentEl = this.values[currentIdx].priority;
      let parentEl = this.values[parentIdx].priority;

      if (currentEl > parentEl)
        break; // 정상
      else {
        this.swap(this.values, currentIdx, parentIdx);
        currentIdx = parentIdx;
      }
    }
  }

  dequeue() {
    if (this.values.length === 0) return null;
    this.swap(this.values, 0, this.values.length - 1);
    const removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  bubbleDown() {
    if (this.values.length === 0) return null;

    let currentIdx = 0;

    while (true) {
      let currentEl = this.values[currentIdx].priority;
      let leftIdx = currentIdx * 2 + 1;
      let rightIdx = currentIdx * 2 + 2;
      let leftEl;
      let rightEl;
      let swapIdx;

      if (leftIdx < this.values.length) {
        leftEl = this.values[leftIdx].priority;
        if (leftEl < currentEl) swapIdx = leftIdx;
      }

      if (rightIdx < this.values.length) {
        rightEl = this.values[rightIdx].priority;
        if (
          (swapIdx !== null && rightEl < leftEl) ||
          (swapIdx === null && rightEl < currentEl)
        ) {
          swapIdx = rightIdx;
        }
      }

      if (!swapIdx) break;
      else {
        this.swap(this.values, swapIdx, currentIdx);
        currentIdx = swapIdx;
      }
    }
  }
}

function solution() {
  // I. 입력 받기
  let { V, graph, start } = parseInput(input);
  let distances = Array.from({ length: V + 1 }, () => Infinity);
  let queue = new PriorityQueue();

  // I. 다익스트라 구현
  // I. 초기화
  distances[start] = 0;
  queue.enqueue(start, 0);

  while (queue.values.length) {
    const { value: current } = queue.dequeue();

    // I. end 없음
    if (current && distances[current] !== Infinity) {
      for (const neighbor of graph[current]) {
        const candidate = distances[current] + neighbor.weight;
        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          queue.enqueue(neighbor.node, candidate);
        }
      }
    }
  }

  let ans = [];
  distances.forEach((v, i) => {
    if (i !== 0) {
      if (v === Infinity) ans.push("INF");
      else ans.push(v);
    }
  });
  return ans.join("\n");
}

console.log(solution());

