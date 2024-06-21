import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "./testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 그래프를 DFS, BFS 로 순회했을 때의 정점 순서를 각각 출력하라

// 입력: N(정점 개수), M(간선 개수), V(시작 정점), arr(연결되어 있는 정점들)
// 출력: 1. DFS, 2. BFS

// 핵심
// 1. stack, queue 사용하면 끝
// 2. 작은 순서대로 넣어야 하기 때문에 정렬해야 함.

// 의문
// DFS는 꼭 재귀로 작성해야 하는건가 ??

// [문제 세분화] :
// 1. 내가 푼건 DFS(재귀), BFS(반복문)
// 2. 다시 구현해본건 DFS(반복문), BFS(재귀)

// function parseInput(input) {
//     // I. 미쳤네 그냥
//     const [firstLine, ...edges] = input.trim().split('\n');
//     const [n, m, start] = firstLine.split(' ').map(Number);
//     const graph = Array.from({ length: n + 1 }, () => []);
//
//     edges.forEach(edge => {
//         const [u, v] = edge.split(' ').map(Number);
//         graph[u].push(v);
//         graph[v].push(u);
//     });
//
//     graph.forEach(neighbors => neighbors.sort((a, b) => a - b));
//     return { graph, start };
// }

// I. 리펙토링 하자!! => parseInput
// let [n, m, v] = input[0].split(" ").map(Number);
// let arr = input.slice(1).map(x => x.split(" ").map(Number));
// let graph = {};
//
// // I. 양방향 그래프 생성
// for (let i = 0; i < m; i++) {
//     let fromNode = arr[i][0];
//     let toNode = arr[i][1];
//     if (!graph[fromNode]) graph[fromNode] = [];
//     if (!graph[toNode]) graph[toNode] = [];
//     graph[fromNode].push(toNode);
//     graph[toNode].push(fromNode);
// }
//
// // I. 그래프 정렬
// for (const key in graph) {
//     graph[key].sort((a, b) => a - b);
// }

function parseInput(input) {
    const [firstLine, ...edges] = input;
    const [n, m, start] = firstLine.split(" ").map(Number);
    // I. 배열이라 n + 1 해준거임
    const graph = Array.from({ length: n+1 }, () => []);
    // console.log(graph)

    edges.forEach(edge => {
        let [u, v] = edge.split(" ").map(Number);
        graph[u].push(v);
        graph[v].push(u);
    });

    // I. 정렬
    graph.forEach(neighbors => neighbors.sort((a, b) => a - b));
    return { graph, start };
}

const { graph, start } = parseInput(input);
console.log(graph);

// 1번으로 풀어본 것
// function solution(n, m, v) {
//     // M. DFS
//     let dfsAns = [];
//     const DFS = (visited, node) => {
//         // I. Base Case : 더 이상 방문할 노드가 없을 경우 return
//         visited[node - 1] = true;
//         dfsAns.push(node);
//
//         // I. 로직
//         if (graph[node]) {
//             for (let nV of graph[node]) {
//                 if (!visited[nV - 1]) {
//                     visited[nV - 1] = true;
//                     DFS(visited, nV);
//                 }
//             }
//         }
//     };
//     // M. BFS
//     let bfsAns = [];
//     const BFS = (visited) => {
//         const queue = [v];
//         visited[v - 1] = true;
//
//         while (queue.length > 0) {
//             const node = queue.shift();
//             bfsAns.push(node);
//
//             if (graph[node]) {
//                 for (const nV of graph[node]) {
//                     if (!visited[nV - 1]) {
//                         visited[nV - 1] = true;
//                         queue.push(nV);
//                     }
//                 }
//             }
//         }
//     };
//
//     DFS(new Array(n).fill(false), v);
//     BFS(new Array(n).fill(false));
//     return `${dfsAns.join(" ")}\n${bfsAns.join(" ")}`;
// }

// 2번으로 풀어본 것
function solution() {
    // M. DFS(반복문)
    const DFS = () => {
        let visited = new Array(graph.length).fill(false);
        let stack = [start];
        let ans = [];

        while (stack.length > 0) {
            const node = stack.pop();

            // I. 여기서 체킹하는구나..
            if (!visited[node - 1]) {
                visited[node - 1] = true;
                ans.push(node);

                // I. 뒤부터 드감
                for (let i = graph[node].length - 1; i >= 0; i--) {
                    let neighbor = graph[node][i];
                    if (!visited[neighbor - 1]) {
                        stack.push(neighbor);
                    }
                }
                // for (let i = graph[node].length - 1; i >= 0; i--) {
                //     let neighbor = graph[node][i];
                //     if (!visited[neighbor - 1]) {
                //         여기서 만약 위 위 if(!visited) 없에주고, visited[neighbor - 1] = true 를 넣어주면 이건 BFS 인거임 *****
                //         stack.push(neighbor);
                //     }
                // }
            }
        }

        return ans.join(" ");
    };

    return `${DFS()}`;
}

console.log(solution());