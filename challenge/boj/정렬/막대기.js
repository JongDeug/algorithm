import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// N 개의 막대가 주어지고 이를 오른쪽에서 봤을 때 몇개의 막대기가 보이는지 출력하는 함수를 구현해라.

// 입력: N(int, 막대기 수), arr(막대기 높이, int)
// 출력: int, 막대기가 보이는 수

// 핵심:
// 마지막 막대기값을 모든 요소에다 뺀뒤, 그 값이 1이상인 놈들만 카운트 하면됨.
// 배열을 뒤집에서 이놈보다 이놈보다 크면 컷트

// [구체적인 예시 찾기]
// [8, 7, 6, 10, 4, 5] 인 경우 핵심이 적용되지 않음.

// [문제 세분화 하기]
let n = input[0];
let arr = input.slice(1).map(Number);

function solution(n, arr) {
    let answer = 0;
    // I. 배열 뒤집기
    arr = arr.reverse();
    // I. 순회하면서 max값 비교하면서 카운트
    arr.reduce((max, value) => {
        if (max < value) {
            max = value;
            answer++;
        }
        return max;
    }, -Infinity);

    return answer;
}

console.log(solution(n, arr));


// E. 틀린 로직
// function solution(n, arr) {
// I. 마지막 막대기 값을 모든 요소에 뺌, 그리고 1이상인 놈들만 카운트
// let num = arr[arr.length - 1];
// return arr.map(x => x - num).reduce((acc, value) => {
//     if (value >= 1) acc++;
//     return acc;
// }, 0) + 1;
// }