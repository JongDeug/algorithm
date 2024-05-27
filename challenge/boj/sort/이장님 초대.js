import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 나무를 잘 심어서 이장님을 최대한 빨리 초대하는 로직을 구현해라.

// 입력: n(묘목의 수), t(array of integer, 나무가 자라는데 며칠 걸리는지)
// 출력: int(초대할 수 있는 날짜)

// 핵심
// 1. 나무가 다 자란 다음날이 정답
// 2. 시간 1초 => 전에 내가 구현한 것은 시간 복잡도 때문에 시간 초과

// [문제 세분화]
const n = Number(input[0]);
// I. sort 필요
const arr = input[1].split(" ").map(Number).sort((a, b) => b - a);

function solution(n, arr) {
    let answer = 0;
    // I. 순회하면서 max값 넣기
    arr.forEach((v, i) => {
        answer = Math.max(answer, i + v + 2); // 쉽게 가자잉
    });
    return answer;
}

console.log(solution(n, arr));

// function solution(n, arr) {
//     // M. answer, object(map)
//     let answer = 0;
//     let obj = {};
//     // I. while 반복문
//     while (true) {
//         // I. map 에 있는 놈들 하나씩 마이너스
//         for (const key in obj) {
//             if (obj[key]) obj[key]--;
//         }
//
//         // I. arr[answer] 값이 존재하면 ?
//         // I. map 으로 만들어서 초기화
//         if (arr[answer]) obj[answer] = arr[answer];
//
//         // I. 만약 map에 있는 놈들이 모두 0이하면 종료
//         if (Object.keys(obj).every(k => obj[k] <= 0)) break;
//
//         // I. 다음
//         answer++;
//     }
//
//     // I. 다음날, index로 다뤄서 +2;
//     return answer + 2;
// }

// console.log(solution(n, arr));