import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 미로 찾기 게임, 출구로 나가기 위한 최소 칸을 출력하는 함수를 구해라.

// 입력: N,M(출구), arr(미로 칸)
// 출력: int(최소 칸)

// 핵심
// 1. BFS 로 구현한다.
// 2. 최소 칸에 대해 고민해봤는데 BFS 로 구현하면 애초에 방문한 곳을 다시 되돌아 갈 수 없게 만들면 최소 칸이 나온다.
// 3. DFS 로 구현할거면 최소 칸에 대한 처리를 해야한다.
// 3-1. => DFS 는 최단 경로를 찾는데 비효율적이다. => 이 문제는 DFS 로 풀면 안됨.


// [문제 세분화]
let [first, ...arr] = input;
let [n, m] = first.split(" ").map(Number);
arr = arr.map(x => x.split("").map(Number));

// BFS 로 구현
function solution(n, m, arr) {
    // M. dy, dx, checkRange 함수
    let dy = [-1, 1, 0, 0];
    let dx = [0, 0, -1, 1];
    const checkRange = (x, y) => {
        if (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length) return false;
        return arr[y][x] !== 0;
    };
    // M. BFS 구현
    const BFS = (startX, startY) => {
        let queue = [[startX, startY]];
        let visited = Array.from({ length: arr.length }, () => new Array(arr[0].length).fill(0));
        visited[startY][startX] = 1;
        let result = 0;

        while (queue.length) {
            let [x, y] = queue.shift();

            // I. 종료 조건
            if (x === m - 1 && y === n - 1) return visited[y][x];

            for (let k = 0; k < 4; k++) {
                let ny = dy[k] + y;
                let nx = dx[k] + x;
                if (checkRange(nx, ny) && !visited[ny][nx]) {
                    visited[ny][nx] = visited[y][x] + 1; // I. 아! 이전 값을 이렇게 넣을 수 있구나.
                    queue.push([nx, ny]);
                }
            }
        }
    };

    // I. 1,1 부터 BFS 시작, 최소 칸수 반환
    return BFS(0, 0);
}

console.log(solution(n, m, arr));

// DFS 로 구현 => 비효율적
// function solution(n, m, arr) {
//     // 방향 배열 (상, 하, 좌, 우)
//     let dy = [-1, 1, 0, 0];
//     let dx = [0, 0, -1, 1];
//
//     // 범위 체크 함수
//     const checkRange = (x, y) => {
//         if (x < 0 || x >= m || y < 0 || y >= n) return false;
//         return arr[y][x] === 1;
//     };
//
//     // DFS 함수
//     const DFS = (x, y, steps) => {
//         // 만약 목적지에 도착하면 최소 칸 수 갱신
//         if (x === m - 1 && y === n - 1) {
//             minSteps = Math.min(minSteps, steps);
//             return;
//         }
//
//         // 방문 표시
//         arr[y][x] = 'hi';
//
//         // 4방향 탐색
//         for (let k = 0; k < 4; k++) {
//             let ny = y + dy[k];
//             let nx = x + dx[k];
//
//             if (checkRange(nx, ny)) {
//                 DFS(nx, ny, steps + 1);
//             }
//         }
//
//         // 탐색이 끝나면 방문 표시 해제 (백트래킹)
//         arr[y][x] = 1;
//     };
//
//     let minSteps = Infinity;
//     DFS(0, 0, 1);
//
//     return minSteps;
// }
//
// console.log(solution(n, m, arr));
