import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 각 노드의 부모를 출력하는 프로그램을 구현해라.

// 입력 : N(노드 개수), Edges(내용물)
// 출력 : array of integer (2번부터 부모노드)

// 핵심
// 1. 에잉! 잘못 생각함. 1부터 BFS 로 내려와서 기록해주면 됨

// [문제 세분화]
let [first, ...edges] = input;
let n = Number(first); // 이거 Number 로 안고쳐서 틀린거임 ㅇㅇ
let graph = {};

edges.forEach(e => {
    let [u, v] = e.split(" ").map(Number);
    if (!graph[v]) graph[v] = [];
    if (!graph[u]) graph[u] = [];
    graph[u].push(v);
    graph[v].push(u);
});

function solution() {
    let ans = new Array(n + 1).fill(0); // 1은 제외이므로 n-1
    // M. BFS
    const BFS = (v) => {
        const queue = [v];
        let visited = new Array(n + 1).fill(false);

        while (queue.length > 0) {
            const node = queue.shift();

            if (!visited[node]) {
                visited[node] = true;

                if (graph[node]) {
                    for (const neighbor of graph[node]) {
                        if (!visited[neighbor]) {
                            ans[neighbor] = node;
                            queue.push(neighbor);
                        }
                    }
                }
            }
        }
    };

    BFS(1);

    return ans.slice(2).join("\n");
}

console.log(solution());