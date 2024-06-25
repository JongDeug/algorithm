import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 트리가 몇개 구성되는지 출력해라.

// 입력: N(정점수), M(간선수), Edges(요소들)
// 출력: int(연결된 트리 더미 개수)

// 핵심
// for 문 으로 반복해서 DFS 가 몇 번 실행되는지 체킹만 하면됨.

// [문제 세분화]
let [first, ...edges] = input.map(x => x.split(" ").map(Number));
let [n, m] = first;
let graph = {};

edges.forEach(edge => {
    let [u, v] = edge;
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push(v);
    graph[v].push(u);
});

function solution() {
    let ans = 0;
    let visited = new Array(n + 1).fill(false);

    // M. DFS
    const DFS = (v) => {
        let stack = [v];

        while (stack.length > 0) {
            const node = stack.pop();

            if (!visited[node]) {
                visited[node] = true;

                if (graph[node]) {
                    for (const neighbor of graph[node]) {
                        if (!visited[neighbor]) {
                            stack.push(neighbor);
                        }
                    }
                }
            }
        }
    };

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            DFS(i);
            ans++;
        }
    }

    return ans;
}

console.log(solution());