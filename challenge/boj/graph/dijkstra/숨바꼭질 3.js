import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 수빈이가 동생 찾아야하는데 가장 빠른 시간이 몇초 인지 구하는 프로그램을 구해라.

// 입력: N(수빈이 점), K(동생 점)
// 출력: int(가장 빠른 시간)

// 조건)
// 1. X+1, X-1 => 1초
// 2. 2*X => 0초
// 3. N부터 K+1 까지 그래프
// 4. 양방향 그래프 연결, 곱2 연결, 가중치 없엠. neighbor 에서 체킹할거임

// 핵심)
// 1. Dijkstra, PriorityQueue(heap)

// 틀림)
// 1. 그래프 초기화를 잘못했음. 시간 복잡도를 줄이기 위해 범위를 start, end 로 설정했는데 XX
// 2. 1 부터 100,000 까지 가 맞고 어차피 O(VlogV) 복잡도이기 때문에 걱정 x

// 다른 방법)
// 우선순위 큐를 사용하지 않으면 다익스트라 시간 복잡도는 O(V^2) 이 될 거임
// 하지만 문제의 특성을 이용하면 O(V+E) 복잡도를 가지는 다익스트라를 구현할 수 있음. ==> 우선순위가 낮으면(*2) 큐 앞부분에 배치!!

// [구체적인 예시 찾기]
/**
 * 1 7
 * 1초
 */

// [문제 세분화] : Deque 자료구조 사용
function parseInput(input) {
    let [start, end] = input[0].split(" ").map(Number);
    return { start, end };
}

function solution() {
    // I. 입력 받기
    let { start, end } = parseInput(input);
    const MAX = 100000;
    let distances = Array.from({ length: MAX + 1 }, () => Infinity);
    let deque = [];

    // I. 다익스트라 구현
    distances[start] = 0;
    deque.push(start);

    while (deque.length) {
        let node = deque.shift();

        if (node === end) return distances[node];
        else {
            let pos = [node * 2, node + 1, node - 1];
            for (const next of pos) {
                if (next >= 0 && next <= MAX) {
                    // I. candidate 구하기
                    let weight = (next === node * 2) ? 0 : 1;
                    let candidate = distances[node] + weight;
                    if (candidate < distances[next]) {
                        distances[next] = candidate;
                        if (weight === 0) deque.unshift(next); // I. 우선순위 때문에 앞에 추가
                        else deque.push(next); // I. 뒤에 추가
                    }
                }
            }
        }
    }
}

console.log(solution());

// // [문제 세분화] : 우선순위 큐를 사용한 다익스트라 알고리즘
// function parseInput(input) {
//     let [start, end] = input[0].split(" ").map(Number);
//     const MAX = 100000;
//     let graph = Array.from({ length: MAX + 1 }, () => []);
//     let distances = Array.from({ length: MAX + 1 }, () => Infinity);
//     let previous = Array.from({ length: MAX + 1 }, () => null);
//     for (let i = 0; i <= MAX; i++) {
//         let next = (i + 1) !== 100000 ? i + 1 : 100000;
//         let prev = (i - 1) !== -1 ? i - 1 : 0;
//         let multiple = i * 2;
//         graph[i].push(next);
//         graph[i].push(prev);
//         graph[i].push(multiple);
//     }
//     return { start, end, graph, distances, previous };
// }
//
// // I. 우선순위 큐 구현
// class Node {
//     constructor(value, priority) {
//         this.value = value;
//         this.priority = priority;
//     }
// }
//
// class PriorityQueueHeap {
//     constructor() {
//         this.values = [];
//     }
//
//     // enqueue
//     enqueue(value, priority) {
//         let node = new Node(value, priority);
//         this.values.push(node);
//         this.bubbleUp();
//     }
//
//     bubbleUp() {
//         if (this.values.length === 1) return null;
//
//         let currentIdx = this.values.length - 1;
//
//         while (true) {
//             let parentIdx = Math.floor((currentIdx - 1) / 2);
//
//             if (!(currentIdx >= 0 && currentIdx < this.values.length) || !(parentIdx >= 0 && parentIdx < this.values.length)) return false;
//
//             let currentEl = this.values[currentIdx].priority;
//             let parentEl = this.values[parentIdx].priority;
//
//             if (currentEl > parentEl) break;
//             else {
//                 [this.values[currentIdx], this.values[parentIdx]] = [this.values[parentIdx], this.values[currentIdx]];
//                 currentIdx = parentIdx;
//             }
//         }
//     }
//
//     // dequeue
//     dequeue() {
//         if (this.values.length === 0) return null;
//         [this.values[this.values.length - 1], this.values[0]] = [this.values[0], this.values[this.values.length - 1]];
//         const removed = this.values.pop();
//         this.bubbleDown();
//         return removed;
//     }
//
//     bubbleDown() {
//         if (this.values.length === 0) return null;
//
//         let currentIdx = 0;
//
//         while (true) {
//             let leftIdx = (currentIdx * 2) + 1;
//             let rightIdx = (currentIdx * 2) + 2;
//
//             let currentEl = this.values[currentIdx].priority;
//             let leftEl;
//             let rightEl;
//             let swapIdx;
//
//             if (leftIdx < this.values.length) {
//                 leftEl = this.values[leftIdx].priority;
//                 if (leftEl < currentEl) swapIdx = leftIdx;
//             }
//
//             if (rightIdx < this.values.length) {
//                 rightEl = this.values[rightIdx].priority;
//                 if ((swapIdx !== null && rightEl < leftEl) || (swapIdx === null && rightEl < currentEl)) {
//                     swapIdx = rightIdx;
//                 }
//             }
//
//             if (!swapIdx) break;
//             [this.values[currentIdx], this.values[swapIdx]] = [this.values[swapIdx], this.values[currentIdx]];
//             currentIdx = swapIdx;
//         }
//     }
// }
//
// function solution() {
//     // I. 입력 받기
//     let { start, end, graph, distances, previous } = parseInput(input);
//
//     // M. 다익스트라 구현
//     const dijkstra = () => {
//         // I. 초기화
//         let queue = new PriorityQueueHeap();
//         queue.enqueue(start, 0);
//         distances[start] = 0;
//         previous[start] = start;
//
//         // I. 반복문
//         while (queue.values.length) {
//             let smallest = queue.dequeue();
//
//             // I. 만약 end 면 거리 return
//             if (smallest && smallest.value === end) return distances[smallest.value];
//             // I. 아니면 candidate
//             else {
//                 if (smallest && distances[smallest.value] !== Infinity) {
//                     if (graph[smallest.value]) {
//                         for (const neighbor of graph[smallest.value]) {
//                             const weight = neighbor === smallest.value * 2 ? 0 : 1;
//                             const candidate = distances[smallest.value] + weight;
//                             if (candidate < distances[neighbor]) {
//                                 distances[neighbor] = candidate;
//                                 previous[neighbor] = smallest.value;
//                                 queue.enqueue(neighbor, candidate);
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     };
//
//     return dijkstra();
// }
//
// console.log(solution());
