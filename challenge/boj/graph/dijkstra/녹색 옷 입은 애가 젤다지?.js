import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 링크가 동굴에서 빠져나올 때 잃을 수 밖에 없는 최소 금액을 구해라.

// 입력: N(동굴크기), arrN(도둑루피) ... 반복(테스트케이스 여러개)
// 출력: int(잃을 수 박에 없는 최소 금액)

// 핵심
// 1. 가중치가 없으면 BFS 를 사용해도 되지만 가중치가 있으므로 다익스트라 알고리즘을 사용한다.
// 2. 우선순위 큐에서 힙이 필요없어보인다 => O(V^2*logV)

// [문제 세분화]
function parseInput(input) {
    let N = Number(input.splice(0, 1).toString());
    let arrN = input.splice(0, N).map(x => x.split(" ").map(Number));

    return { N, arrN };
}

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
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

function solution() {
    let ans = [];
    let count = 1;

    while (true) {
        // I. 입력 받기
        let { N, arrN } = parseInput(input);
        let distances = Array.from({ length: N }, () => new Array(N).fill(Infinity));
        let queue = new PriorityQueue();
        const dx = [0, 0, 1, -1];
        const dy = [-1, 1, 0, 0];

        if (N === 0) break;

        // M. 다익스트라 구현
        // I. 초기화
        distances[0][0] = arrN[0][0];
        queue.enqueue([0, 0], arrN[0][0]);

        while (queue.values.length) {
            let { value: current } = queue.dequeue();
            let [x, y] = current;

            for (let k = 0; k < 4; k++) {
                let nx = dx[k] + x;
                let ny = dy[k] + y;

                if ((nx >= 0 && nx < N) && (ny >= 0 && ny < N)) {
                    const candidate = distances[y][x] + arrN[ny][nx];
                    if (candidate < distances[ny][nx]) {
                        distances[ny][nx] = candidate;
                        queue.enqueue([nx, ny], candidate);
                    }
                }
            }
        }

        ans.push(`Problem ${count}: ${distances[N - 1][N - 1]}`);
        count++;
    }

    return ans.join("\n");
}

console.log(solution());