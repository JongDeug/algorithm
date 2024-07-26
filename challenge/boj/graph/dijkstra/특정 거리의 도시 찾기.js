import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 도시를 이동하는데 주어진 K 만큼의 최단 거리에 위치해있는 도시 번호를 출력하는 프로그램을 구현해라.

// 입력: N(도시 개수), M(도로의 개수), K(거리 정보), X(출발 도시 번호)
// 출력: int(도시번호, 오름차순), 없으면 -1 출력

// [문제 세분화]
class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        let node = new Node(value, priority);
        this.values.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        if (this.values.length === 1) return this.values;

        let currentIdx = this.values.length - 1;
        while (true) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);

            // I. currentIdx, parentIdx(currentIdx 가 0이 될 수 있으므로) 체킹, 범위 안에 없으면 break
            if (!(currentIdx < this.values.length && currentIdx >= 0) || !(parentIdx < this.values.length && parentIdx >= 0)) break;

            // I. 부모와 비교해서 작으면 올라간다. 그렇지 않으면 종료한다.
            let currentEl = this.values[currentIdx].priority;
            let parentEl = this.values[parentIdx].priority;

            if (currentEl >= parentEl) break;
            else {
                // I. swap
                [this.values[currentIdx], this.values[parentIdx]] = [this.values[parentIdx], this.values[currentIdx]];
                currentIdx = parentIdx;
            }
        }
    }

    dequeue() {
        if (this.values.length === 0) return null;

        [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
        const removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        if (this.values.length === 0) return null;

        let currentIdx = 0;
        while (true) {
            let leftChildIdx = (currentIdx * 2) + 1;
            let rightChildIdx = (currentIdx * 2) + 2;

            // I. 이미 0 이라 범위 체킹 x
            let currentEl = this.values[currentIdx].priority;
            let leftChildEl;
            let rightChildEl;
            let swapIdx = null;

            if (leftChildIdx < this.values.length) {
                leftChildEl = this.values[leftChildIdx].priority;
                if (currentEl > leftChildEl) swapIdx = leftChildIdx;
            }

            if (rightChildIdx < this.values.length) {
                rightChildEl = this.values[rightChildIdx].priority;
                if ((swapIdx && rightChildEl < leftChildEl) || (!swapIdx && currentEl < rightChildEl)) {
                    swapIdx = rightChildIdx;
                }
            }

            if (!swapIdx) break;
            [this.values[currentIdx], this.values[swapIdx]] = [this.values[swapIdx], this.values[currentIdx]];
            currentIdx = swapIdx;
        }
    }
}

function parseInput(input) {
    let [first, ...edges] = input;
    let [N, M, K, X] = first.split(" ").map(Number);
    let graph = {};
    // I. 단방향 초기화
    edges.forEach(edge => {
        let [u, v] = edge.split(" ").map(Number);
        if (!graph[u]) graph[u] = [];
        graph[u].push({ node: v, weight: 1 });
    });
    return { N, K, X, graph };
}

function solution() {
    // I. 입력 받기
    let { N, K, X, graph } = parseInput(input);
    let ans = [];

    // M. dijkstra 알고리즘 구현
    const dijkstra = (start) => {
        // M. distances, previous, 우선 순위 큐
        let distances = {};
        let previous = {};
        let priorityQ = new PriorityQueue();

        // I. 초기 세팅
        for (let v = 1; v <= N; v++) {
            if (v === start) {
                previous[v] = v;
                distances[v] = 0;
                priorityQ.enqueue(v, 0);
            } else {
                previous[v] = null;
                distances[v] = Infinity;
                priorityQ.enqueue(v, Infinity);
            }
        }

        // I. 반복문 ㄱ
        while (priorityQ.values.length) {
            //  i. 우선 순위 큐에서 노드 빼기
            const smallest = priorityQ.dequeue();

            // ************ distances 가 K 이하인 경우만 체킹하면 됨. ====> 안그럼 시간 초과 난다!
            if (distances[smallest.value] <= K) {
                //  i. 뺀 노드가 존재하고, 최소 거리 정보가 INF 가 아니면
                if (smallest.value || distances[smallest.value] !== Infinity) {
                    //  i. node 와 인접한 v 돌기
                    //  i. 단방향이라 체킹 해줘야 함.
                    if (graph[smallest.value]) {
                        for (const neighbor of graph[smallest.value]) {
                            //해당 노드 경로 vs 최소 거리 정보
                            const candidate = distances[smallest.value] + neighbor.weight;
                            if (candidate < distances[neighbor.node]) {
                                // i. distances 초기화
                                distances[neighbor.node] = candidate;
                                // i. previous 초기화
                                previous[neighbor.node] = smallest.value;
                                // i. 큐에 넣기
                                priorityQ.enqueue(neighbor.node, candidate);
                            }
                        }
                    }
                }
            }
        }

        for (const v in distances) {
            if (distances[v] === K) {
                ans.push(v);
            }
        }
    };
    dijkstra(X);

    return ans.length > 0 ? ans.sort((a, b) => a - b).join("\n") : -1;
}

console.log(solution());

