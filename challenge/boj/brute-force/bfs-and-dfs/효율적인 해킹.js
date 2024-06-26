import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호 출력

// 입력: N(노드번호, 1~N), M(간선관계 수), Edges
// 출력: 한 번에 가장 많이 해킹할 수 있는 컴터 번호 "오름차순" 출력

// 핵심
// DFS 로 풀면 효율적으로 풀 수 있다고 생각함. => 처음은 이랬.

// 틀린 문제 !!!!!!!!!!!!!!!!!!
// 애초에 문제를 잘못 이해했음...
// 틀림 해석 : "한 번에" 라는 말 때문에 DFS 를 고려했고 깊이가 가장 높은 노드를 고르는 문제라고 생각함
// 올바른 해석 : 깊이가 가장 높은 노드가 아니고 해킹할 수 있는 컴퓨터의 수가 가장 많은 노드를 고르는 것이 올바른 해석임

// 결론 : 계속 최적화했지만 시간초과가 나서 skip 함 => 다른 사람도 비슷한 경험한듯!, 풀이는 맞다고 생각함

// [문제 세분화] :
let [first, ...edges] = input;
let [n, m] = first.split(" ").map(Number);
let graph = {};

// I. A가 B를 신뢰한다. => B에서 A를 타고 해킹할 수 있다. 역방향으로 그래프 구성
edges.forEach(edge => {
    let [u, v] = edge.split(" ").map(Number);
    if (!graph[v]) graph[v] = [];
    graph[v].push(u);
});

function solution() {
    let ans = [];
    let maxCount = 0;

    // I. BFS 함수 구현
    const BFS = (v) => {
        let queue = [v];
        let visited = new Array(n + 1).fill(false);
        let count = 0;

        while (queue.length > 0) {
            let node = queue.shift();

            if (!visited[node]) {
                visited[node] = true;
                count++;

                if (graph[node]) {
                    for (const neighbor of graph[node]) {
                        if (!visited[neighbor]) {
                            queue.push(neighbor);
                        }
                    }
                }
            }
        }

        return count;
    };

    for (let i = 1; i <= n; i++) {
        const count = BFS(i);

        if (count > maxCount) {
            maxCount = count;
            ans = [i];
        } else if (count === maxCount) {
            ans.push(i);
        }
    }
    console.log(ans.join(" "));
}

solution();


// 시간 초과 => DFS 로 구현
// function solution() {
//     let ans = [];
//     // I. DFS 함수 구현
//     const DFS = (v) => {
//         let stack = [v];
//         let visited = new Array(n + 1).fill(false);
//         let count = 0;
//
//         while (stack.length > 0) {
//             let node = stack.pop();
//
//             if (!visited[node]) {
//                 visited[node] = true;
//                 count++;
//
//                 if (graph[node]) {
//                     for (const neighbor of graph[node]) {
//                         if (!visited[neighbor]) {
//                             stack.push(neighbor);
//                         }
//                     }
//                 }
//             }
//         }
//
//         return count;
//     };
//
//     // I. 정렬 방법 1
//     // DFS = O(N * (V + E)), V,E는 N에 근접하므로 => O(N^2)
//     // sort = O(NlogN)
//     // reduce = O(N)
//     // 결과적으로 => O(N^1 + NlogN)
//     // for (let i = 1; i <= n; i++) {
//     //     const count = DFS(i);
//     //     ans.push([count, i]);
//     // }
//     // ans.sort((a, b) => {
//     //     if (b[0] - a[0]) return b[0] - a[0]; // 크거나 작다면
//     //     else return a[1] - b[1]; // 같다면
//     // });
//     // let maxCount = ans[0][0];
//     // return ans.reduce((acc, value) => {
//     //     if (value[0] === maxCount) acc.push(value[1]);
//     //     return acc;
//     // }, []).join(" ");
//
//     // I. 정렬 방법 2
//     // DFS = O(N * (V + E)), V,E는 N에 근접하므로 => O(N^2)
//     // 최댓값 비교 = O(N)
//     // 결과적으로 => O(N^2)
//     let maxCount = 0;
//     for (let i = 1; i <= n; i++) {
//         const count = DFS(i);
//         if (count > maxCount) {
//             maxCount = count;
//             ans = [i];
//         } else if (count === maxCount) {
//             ans.push(i);
//         }
//     }
//     return ans.join(" ");
// }
//
// console.log(solution());

// 이건 아예 틀린 구현
// function solution() {
//     let ans = [];
//
//     // M. DFS 구현
//     const DFS = (v) => {
//         let stack = [[v, 0]];
//         // M. 방문 확인
//         let visited = new Array(n + 1).fill(false);
//         let maxDepth = -1;
//
//         while (stack.length > 0) {
//             let [node, depth] = stack.pop();
//
//             if (!visited[node]) {
//                 visited[node] = true;
//                 // I. 가장 깊이 들어갔던 놈
//                 maxDepth = Math.max(maxDepth, depth);
//
//                 if (graph[node]) {
//                     for (const neighbor of graph[node]) {
//                         if (!visited[neighbor]) {
//                             stack.push([neighbor, depth + 1]);
//                         }
//                     }
//                 }
//             }
//         }
//
//         return { depth: maxDepth, v };
//     };
//
//     // I. 반복문
//     for (let i = 1; i <= n; i++) {
//         const { depth, v } = DFS(i);
//         ans.push([depth, v]);
//     }
//
//     // I. depth 로 정렬
//     ans.sort((a, b) => {
//         // 0 이 아니라면
//         if (b[0] - a[0]) return b[0] - a[0];
//         else return a[1] - b[1];
//     });
//     console.log(ans)
//
//     const maxDepth = ans[0][0];
//     return ans.reduce((acc, value) => {
//         if (value[0] === maxDepth) acc.push(value[1]);
//         return acc;
//     }, []).join(" ");
// }
//
// console.log(solution());