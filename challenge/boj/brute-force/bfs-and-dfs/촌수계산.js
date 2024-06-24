import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "./testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 촌수를 구하는 함수를 구현해라.

// 입력: N(사람 수), [X, Y](구해야 하는 사람 번호), E(간선 수), arr(관계들)
// 출력: int(촌수)

// 핵심
// 촌수를 좀 더 빠르게 구하려면 BFS로 구해야 한다고 생각함.
// 아닌가 깊이로 들어가는 거기 때문에 DFS가 더 적합한가?
// 조건
// 촌수를 계산할 수 없으면 -1 출력!

// [문제 세분화]
function parseInput(input) {
    let [first, second, edgeNum, ...edges] = input;
    let n = Number(first);
    let [x, y] = second.split(" ").map(Number);
    let graph = {};

    edges.forEach(edge => {
        let [u, v] = edge.split(" ").map(Number);
        if (!graph[u]) graph[u] = [];
        if (!graph[v]) graph[v] = [];
        graph[u].push(v);
        graph[v].push(u);
    });

    return { graph, x, y };
}

let { graph, x, y } = parseInput(input);

function solution(graph, x, y) {
    // M. BFS 도는 함수 만들기
    const BFS = (v, u) => {
        let queue = [[v, 0]];
        let visited = new Array(Object.keys(graph).length + 1).fill(false);

        while (queue.length > 0) {
            let [node, depth] = queue.shift();

            if (!visited[node]) {
                if (node === u) {
                    return depth;
                }
                visited[node] = true;
                depth++;

                for (const neighbor of graph[node]) {
                    // I. true로 바꾸지 않아도 적어도 방문됐는지는 체킹해야함.
                    if (!visited[neighbor]) {
                        queue.push([neighbor, depth]);
                    }
                }
            }
        }

        return -1;
    };

    return BFS(x, y);
}

console.log(solution(graph, x, y));