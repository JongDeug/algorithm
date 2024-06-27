import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 단지 수와 단지에 속하는 집의 수를 오름차순으로 출력하는 함수를 구현해라.

// 입력: N(정사각형 높이,길이), arr(미로, 방)
// 출력: 첫 째줄 총 단지 수 출력, 집의 수를 오름차순으로 출력

// 핵심 :
// 1. BFS, DFS 아무거나 골라서 풀면됨
// 2. 2중 for 문
// 3. depth 와 count 를 잘 구분하자.

// [구체적인 예시]
// 5
// 01001
// 00000
// 01110
// 01001
// 10001

// [문제 세분화]
let [first, ...arr] = input;
let n = Number(first);
arr = arr.map(x => x.split("").map(Number));

// 방식 2
// function solution(n, arr) {
//     let total = 0;
//     let homeCount = [];
//     let visited = Array.from({ length: n }, () => new Array(n).fill(false));
//
//     // M. dy, dx, rangeCheck
//     let dy = [-1, 1, 0, 0];
//     let dx = [0, 0, -1, 1];
//     let rangeCheck = (x, y) => {
//         if (x < 0 || x >= n || y < 0 || y >= n) return false;
//         return arr[y][x] === 1;
//     };
//     // M. BFS 구현
//     const BFS = (x, y) => {
//         let queue = [[x, y]];
//         let count = 0;
//
//         while (queue.length) {
//             let [x, y] = queue.shift();
//
//             if (!visited[y][x]) {
//                 visited[y][x] = true;
//                 count++;
//
//                 for (let k = 0; k < 4; k++) {
//                     let nx = x + dx[k];
//                     let ny = y + dy[k];
//                     if (rangeCheck(nx, ny) && !visited[ny][nx]) {
//                         // 바로 true 로 바꾸지 않아도 됨 => 큐의 특성을 이용하는거지.
//                         queue.push([nx, ny]);
//                     }
//                 }
//             }
//         }
//         return count ? count : 1;
//     };
//
//     // I. 2중 for 문
//     for (let y = 0; y < n; y++) {
//         for (let x = 0; x < n; x++) {
//             // I. 유효한 방 + 방문하지 않았던 방
//             if (arr[y][x] && !visited[y][x]) {
//                 const result = BFS(x, y);
//                 homeCount.push(result);
//                 total++;
//             }
//         }
//     }
//
//     return `${total}\n` + homeCount.sort((a, b) => a - b).join("\n");
// }
//
// console.log(solution(n, arr));

// 방식 1
function solution(n, arr) {
    let total = 0;
    let homeCount = [];
    let visited = Array.from({ length: n }, () => new Array(n).fill(false));

    // M. dy, dx, rangeCheck
    let dy = [-1, 1, 0, 0];
    let dx = [0, 0, -1, 1];
    let rangeCheck = (x, y) => {
        if (x < 0 || x >= n || y < 0 || y >= n) return false;
        return arr[y][x] === 1;
    };
    // M. BFS 구현
    const BFS = (x, y) => {
        let queue = [[x, y]];
        let count = 1;
        // I. for 안에서 true 처리 해줄거면 시작을 true 로 변경해야함. 안그러면 두번 돎
        visited[y][x] = true;

        while (queue.length) {
            let [x, y] = queue.shift();

            for (let k = 0; k < 4; k++) {
                let nx = x + dx[k];
                let ny = y + dy[k];
                if (rangeCheck(nx, ny) && !visited[ny][nx]) {
                    // I. 방문 체크
                    count++;
                    visited[ny][nx] = true;
                    queue.push([nx, ny]);
                }
            }
        }
        return count;
    };

    // I. 2중 for 문
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            // I. 유효한 방 + 방문하지 않았던 방
            if (arr[y][x] && !visited[y][x]) {
                const result = BFS(x, y);
                homeCount.push(result);
                total++;
            }
        }
    }

    return `${total}\n` + homeCount.sort((a, b) => a - b).join("\n");
}

console.log(solution(n, arr));