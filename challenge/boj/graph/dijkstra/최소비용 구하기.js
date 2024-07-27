import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// A에서 B로 이동하는데 필요한 최소 경로를 구해라.

// 입력: N(도시 개수), M(간선 개수), 3 ~ M+2까지 arrM(간선 정보), arrS(M+3, 시작, 도착 도시)
// 출력: int(최소 비용)

// [구체적인 예시 찾기]
/**
 * 4
 * 4
 * 1 2 2
 * 1 3 3
 * 2 4 5
 * 3 4 2
 * 1 4
 */

// 핵심
// 1. 다익스트라 => O((V+E)logV) => 이렇게 쓰려면 힙을 사용해야 함.
// 2. 단방향 그래프

// [문제 세분화]
function parseInput(input) {
    let [N, M, ...edges] = input;
    N = Number(N);
    let graph = Array.from({ length: N + 1 }, () => []);
    let distances = Array.from({ length: N + 1 }, () => Infinity);
    let previous = Array.from({ length: N + 1 }, () => null);
    let [start, end] = edges.splice(edges.length - 1, 1).toString().split(" ").map(Number);
    edges.forEach(edge => {
        let [u, v, w] = edge.split(" ").map(Number);
        graph[u].push({ node: v, weight: w });
    });
    return { N, graph, distances, previous, start, end };
}

// I. 우선순위 큐 구현
class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

class PriorityQueueHeap {
    constructor() {
        this.values = [];
    }

    // enqueue
    enqueue(value, priority) {
        let node = new Node(value, priority);
        this.values.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        if (this.values.length === 1) return null;

        let currentIdx = this.values.length - 1;

        while (true) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);

            if (!(currentIdx >= 0 && currentIdx < this.values.length) || !(parentIdx >= 0 && parentIdx < this.values.length)) return false;

            let currentEl = this.values[currentIdx].priority;
            let parentEl = this.values[parentIdx].priority;

            if (currentEl > parentEl) break;
            else {
                [this.values[currentIdx], this.values[parentIdx]] = [this.values[parentIdx], this.values[currentIdx]];
                currentIdx = parentIdx;
            }
        }
    }

    // dequeue
    dequeue() {
        if (this.values.length === 0) return null;
        [this.values[this.values.length - 1], this.values[0]] = [this.values[0], this.values[this.values.length - 1]];
        const removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        if (this.values.length === 0) return null;

        let currentIdx = 0;

        while (true) {
            let leftIdx = (currentIdx * 2) + 1;
            let rightIdx = (currentIdx * 2) + 2;

            let currentEl = this.values[currentIdx].priority;
            let leftEl;
            let rightEl;
            let swapIdx;

            if (leftIdx < this.values.length) {
                leftEl = this.values[leftIdx].priority;
                if (leftEl < currentEl) swapIdx = leftIdx;
            }

            if (rightIdx < this.values.length) {
                rightEl = this.values[rightIdx].priority;
                if ((swapIdx !== null && rightEl < leftEl) || (swapIdx === null && rightEl < currentEl)) {
                    swapIdx = rightIdx;
                }
            }

            if (!swapIdx) break;
            [this.values[currentIdx], this.values[swapIdx]] = [this.values[swapIdx], this.values[currentIdx]];
            currentIdx = swapIdx;
        }
    }
}


function solution() {
    // I. 입력 받기
    let { N, graph, distances, previous, start, end } = parseInput(input);

    // M. 다익스트라 구현
    const dijkstra = () => {
        // I. 초기화(큐, distances)
        let queue = new PriorityQueueHeap();
        queue.enqueue(start, 0);
        distances[start] = 0;
        previous[start] = start;

        // I. 반복문
        while (true) {
            let smallest = queue.dequeue(); // value, priority

            //  i. 값이 end 면 찾아서 반환
            if (smallest?.value === end) {
                return distances[end];
            }
            //  i. 그게 아니면 candidate 구해서 distances, queue 에 값 넣기
            else {
                if (smallest && distances[smallest.value] !== Infinity) {
                    // i. 그래프 돌면서 최소 정보
                    for (const neighbor of graph[smallest.value]) {
                        const candidate = distances[smallest.value] + neighbor.weight;
                        if (candidate < distances[neighbor.node]) {
                            // i. queue, distances, previous
                            distances[neighbor.node] = candidate;
                            previous[neighbor.node] = smallest.value;
                            queue.enqueue(neighbor.node, candidate);
                        }
                    }
                }
            }
        }
    };

    return dijkstra();
}

console.log(solution());