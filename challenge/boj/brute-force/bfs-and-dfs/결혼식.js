import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 상근이 결혼식에 초대할 수 있는 동기 수를 출력해라.

// 입력: n(상근이 동기수), e(간선수), edges(관계), 상근이 학번 1
// 출력: int(초대 가능 동기 수)

// 핵심
// 1. 양방향 graph 만들기
// 2. 1 의 친구와 친구
// 3. 이번엔 DFS 로 구현 해보자. => 잘못 푼 것 같은데... 너비 우선 탐색이 맞아. 이 문제는

// [문제 세분화]
let [first, second, ...edges] = input.map(x => x.split(" ").map(Number));
let n = Number(first);
let e = Number(second);
let graph = {};

edges.forEach(e => {
    let [u, v] = e;
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push(v);
    graph[v].push(u);
});

function solution() {
    const BFS = (v) => {
        const queue = [[v, 0]];
        let visited = new Array(n + 1).fill(false);
        let count = 0;

        while (queue.length > 0) {
            const [node, depth] = queue.shift();

            if (!visited[node]) {
                visited[node] = true;
                if (depth <= 2 && depth > 0) count++;

                if (graph[node]) {
                    for (const neighbor of graph[node]) {
                        if (!visited[neighbor]) {
                            queue.push([neighbor, depth + 1]);
                        }
                    }
                }
            }
        }

        return count;
    };

    return BFS(1);
}

console.log(solution());
