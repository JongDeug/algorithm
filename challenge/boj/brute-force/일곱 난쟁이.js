import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 아홉 난쟁이의 키가 주어졌을 때 진짜 일곱 난쟁이를 찾는 로직을 구현해라.

// 입력: arr of integers
// 출력: 일곱 난쟁이

// 조건
// 1. 키의 합이 100이 되어야 함
// 2. 오름 차순으로 출력
// 3. 찾을 수 없는 경우는 없다.

// 핵심
// brute force 완전 탐색으로 구현
// 그냥 반복문 7개로 구현하면 안되는건가 ㅋㅋ

// [문제 세분화] : 리펙토링
function solution(arr) {
    let ans = [];
    let answer = "";

    // I. N 중 R 개를 고른다. 선택!!
    const rec = (idx, n, r, tmp) => {
        // I. Base Case : depth 깊이가 r이면 stop!
        if (idx === r) {
            ans.push([...tmp]);
            return;
        }

        // I. 반복문 로직
        for (let i = idx; i < n; i++) {
            tmp.push(arr[i]);

            rec(idx + 1, n, r, tmp);

            tmp.pop();
        }
    };

    rec(0, 9, 7, []);

    // I. ans 가지고 100되는거 찾기
    for (const array of ans) {
        let sum = 0;

        for (const item of array) {
            sum += item;
        }

        if (sum === 100) {
            // I. 오름 차순으로 정렬 후 출력
            array.sort((a, b) => a - b).map(x => {
                answer += `${x}\n`;
            });
            return answer;
        }
    }
}

console.log(solution(input.map(Number)));


// // I. N 중 R 개를 고른다. 선택!!
// const rec = (depth, n, r, check, tmp) => {
//     // I. Base Case : depth 깊이가 r이면 stop!
//     if (depth === r) {
//         ans.push([...tmp]);
//         return;
//     }
//
//     // I. 반복문 로직
//     for (let i = 0; i < n; i++) {
//         if (!check[i]) {
//             check[i] = true;
//             tmp.push(arr[i]);
//
//             rec(depth + 1, n, r, check, tmp);
//
//             check[i] = false;
//             tmp.pop();
//         }
//     }
// };
//
// rec(0, 9, 7, new Array(9).fill(false), []);

// function solution(arr) {
//     let sum = 0;
//     let store = [];
//     let answer = "";
//     for (let i = 0; i < arr.length; i++) { // 1
//         for (let j = i + 1; j < arr.length; j++) { // 2
//             for (let k = j + 1; k < arr.length; k++) { // 3
//                 for (let l = k + 1; l < arr.length; l++) { // 4
//                     for (let m = l + 1; m < arr.length; m++) { // 5
//                         for (let n = m + 1; n < arr.length; n++) { // 6
//                             for (let x = n + 1; x < arr.length; x++) { // 7
//                                 sum = arr[i] + arr[j] + arr[k] + arr[l] + arr[m] + arr[n] + arr[x];
//                                 if (sum === 100) {
//                                     store.push(arr[i]);
//                                     store.push(arr[j]);
//                                     store.push(arr[k]);
//                                     store.push(arr[l]);
//                                     store.push(arr[m]);
//                                     store.push(arr[n]);
//                                     store.push(arr[x]);
//                                     store.sort((a, b) => a - b).map(x => {
//                                         answer += `${x}\n`;
//                                     });
//                                     return answer;
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
//

// console.log(solution(input.map(Number)));