import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split(" ").map(Number);

// [문제 이해하기]
// 배정된 모든 방에 빈 침대가 없도록 방 배정이 가능한지 확인하는 함수를 구현해라.

// 입력: A, B, C(인실) | N(전체 학생 수)
// 출력: 1 배정 가능, 0 배정 불가능

// 조건
// 1. 빈 침대 없이 방 배정 불가능
// 2. 방은 한 개만 사용해도 됨. 단 빈 침대가 없어야 함.

// 핵심
// 중복이 없는 조합이라고 생각함.

// [문제 세분화] : 아 이거 계속 틀렸는데 메모리 초과였네
// 다음 부터는 Base Case 에서 거르자 .....
let arr = input.slice(0, 3);
let n = input[3];

function solution(arr, n) {
    let ans = [];
    // M. 조합을 구하는 헬퍼함수 구현 (n개 중 3개 뽑기)
    const combination = (x, r, tmp) => {
        // I. Base Case : r이 3이면 종료 => tmp 길이로 해보자
        if (tmp.length === r) {
            if (((tmp[0] * arr[0]) + (tmp[1] * arr[1]) + (tmp[2] * arr[2])) === n) {
                ans.push([...tmp]);
            }
            return;
        }
        // I. 반복문 로직, 중복이 되니까 그냥 0부터 시작하면 될듯
        for (let i = 0; i <= x; i++) {
            tmp.push(i);
            combination(x, r, tmp);
            tmp.pop();
        }
    };

    // I. 학생 수 / 제일 작은 방 수
    combination(Math.floor(n / Math.min(...arr)), 3, []);

    // I. 구한 배열로 전체 학생 수가 되는지 확인
    return ans.length ? 1 : 0;
}

console.log(solution(arr, n));

// function solution(arr, n) {
//     let ans = [];
//     // M. 조합을 구하는 헬퍼함수 구현 (n개 중 3개 뽑기)
//     const combination = (depth, r, tmp) => {
//         // I. Base Case : r이 3이면 종료 => tmp 길이로 해보자
//         if (tmp.length === r) {
//             ans.push([...tmp]);
//             return;
//         }
//         // I. 반복문 로직, 중복이 되니까 그냥 0부터 시작하면 될듯
//         for (let i = 0; i <= Math.floor(n / arr[depth]); i++) {
//             tmp.push(i);
//             combination(depth + 1, r, tmp);
//             tmp.pop();
//         }
//     };
//
//     // I. 학생 수 / 제일 작은 방 수
//     combination(0, 3, []);
//
//
//     // I. 구한 배열로 전체 학생 수가 되는지 확인
//     for (const item of ans) {
//         let sum = (item[0] * arr[0]) + (item[1] * arr[1]) + (item[2] * arr[2]);
//         if (sum === n) {
//             return 1;
//         }
//     }
//     return 0;
// }
//
// console.log(solution(arr, n));
