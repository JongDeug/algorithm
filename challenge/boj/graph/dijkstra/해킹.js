import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 테스트케이스에서 해킹당한 컴퓨터가 몇대인지 걸리는 시간이 몇초인지 구하는 프로그램을 구해라.

// 입력: T(테스트케이스 개수), [n, d, c](컴퓨터 개수, 의존성 개수, 해킹당한 컴퓨터 번호), [a, b, s](a가 b를 의존, s초 후에 감염)
// 출력: int, int (감염되는 컴퓨터 수, 걸린 시간)

// [구체적인 예시]
/**
 * 1
 * 4 3 1
 * 2 1 2
 * 3 2 2
 * 1 4 5
 * => 3 4
 */

// 핵심
// 1. O((V+E)*logV) => 우선순위큐(heap)를 활용한 다익스트라 구현
// 2.

// [문제 세분화]
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

            if (currentIdx < 0 || currentIdx >= this.values.length || parentIdx < 0 || parentIdx >= this.values.length) break;

            let currentEl = this.values[currentIdx].priority;
            let parentEl = this.values[parentIdx].priority;

            if (currentEl > parentEl) break; // 정상
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
            let leftIdx = (currentIdx * 2) + 1;
            let rightIdx = (currentIdx * 2) + 2;
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
            else {
                this.swap(this.values, swapIdx, currentIdx);
                currentIdx = swapIdx;
            }
        }
    }
}

function solution() {
    // I. 입력 받기
    let T = Number(input.splice(0, 1));
    let ans = [];

    for (let i = 0; i < T; i++) {
        let [n, d, c] = input.splice(0, 1).toString().split(" ").map(Number);
        let graph = Array.from({ length: n + 1 }, () => []);
        let distances = Array.from({ length: n + 1 }, () => Infinity);
        let edges = input.splice(0, d);
        let queue = new PriorityQueue();
        edges.forEach(edge => {
            let [a, b, s] = edge.split(" ").map(Number);
            graph[b].push({ node: a, weight: s });
        });

        // I. 다익스트라 구현
        // I. 초기화
        distances[c] = 0;
        queue.enqueue(c, 0);

        while (queue.values.length) {
            let { value: current } = queue.dequeue();

            // I. 있으면
            if (current && distances[current] !== Infinity) {
                for (const neighbor of graph[current]) {
                    // I. 후보자
                    const candidate = distances[current] + neighbor.weight;
                    if (candidate < distances[neighbor.node]) {
                        distances[neighbor.node] = candidate;
                        queue.enqueue(neighbor.node, candidate);
                    }
                }
            }
        }

        // I. ans 에 추가
        let result = distances.reduce((acc, value) => {
            if (value !== Infinity) acc.count += 1;
            if (value !== Infinity && value > acc.max) acc.max = value;
            return acc;
        }, { count: 0, max: 0 });
        ans.push(`${result.count} ${result.max}`);
    }

    return ans.join("\n");
}

console.log(solution());