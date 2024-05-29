import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 꼭짓점 숫자가 모두 같은 정사각형의 크기중 가장 큰 크기를 출력하는 함수를 구현하라.

// 입력: N(행), M(열), arr
// 출력: int(정사각형 크기)

// 핵심
// 반복문과 재귀를 잘 사용해보자.

// [문제 세분화] : 리펙토링 2번 함
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map(x => x.split(""));

function solution(n, m, arr) {
    let ans = [];
    const helper = (depth, row, col) => {
        // Base Case : n, m 중 min 값 보다 크면 종료
        if (depth > Math.min(n, m)) {
            return;
        }
        // I. 기본 로직 => 1*1 다 돌고, 2*2, 3*3 순으로 순회함
        for (let i = row; i < n - depth; i++) {
            for (let j = col; j < m - depth; j++) {
                let compare = arr[i][j];
                if (
                    compare === arr[i][j + depth] &&
                    compare === arr[i + depth][j] &&
                    compare === arr[i + depth][j + depth]
                ) {
                    ans.push((depth + 1) ** 2);
                }
                helper(depth + 1, i, j);
            }
        }
    };

    helper(0, 0, 0);
    return Math.max(...ans);
}

console.log(solution(n, m, arr));

// function solution(n, m, arr) {
//     let ans = [];
//     for (let k = 0; k < Math.min(n, m); k++) {
//         for (let row = 0; row < n - k; row++) {
//             for (let col = 0; col < m - k; col++) {
//                 let compare = arr[row][col];
//                 if (
//                     compare === arr[row][col + k] &&
//                     compare === arr[row + k][col] &&
//                     compare === arr[row + k][col + k]
//                 ) {
//                     ans.push((k + 1) ** 2);
//                 }
//             }
//         }
//     }
//
//     return Math.max(...ans);
// }
//
// console.log(solution(n, m, arr));

// Before 리펙터링
// function solution(n, m, arr) {
//     let ans = [];
//
//     // M. 범위를 체킹해주는 함수가 있어야 함.
//     const checkRange = (row, col) => {
//         return !(row < 0 || row >= n || col < 0 || col >= m);
//     };
//
//     // M. 1*1, 2*2, 3*3 ... 씩 돌면서 꼭짓점이 모두 같은 놈을 찾는 함수를 구현해야 함.
//     const checkRectangle = (depth, row, col) => {
//         // I. Base Case : depth가 n, m 중 가장 작은 값을 넘어가면 stop
//         if (depth > Math.min(n, m)) {
//             return;
//         }
//
//         // I. 범위가 맞으면 돌림
//         if (checkRange(row + depth, col + depth)) {
//             // I. 꼭짓점이 모두 같을 경우 답에 추가
//             let compare = arr[row][col];
//             if (
//                 compare === arr[row][col + depth] &&
//                 compare === arr[row + depth][col] &&
//                 compare === arr[row + depth][col + depth]
//             ) {
//                 ans.push(Math.pow(depth + 1, 2));
//             }
//             // I. 그리고 재귀
//             checkRectangle(depth + 1, row, col);
//         }
//     };
//
//     // I. for 문으로 각 행열의 요소에서 시작해야 함.
//     for (let row = 0; row < n; row++) {
//         for (let col = 0; col < m; col++) {
//             checkRectangle(0, row, col);
//         }
//     }
//
//     return Math.max(...ans);
// }
//
// console.log(solution(n, m, arr));