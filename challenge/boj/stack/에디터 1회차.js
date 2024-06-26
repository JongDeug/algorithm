import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 명령어를 수행하고 난 뒤의 문자열을 반환하는 함수를 구현하라.

// 입력: str(문자열), n(명령어 개수), arr(명령어)
// 출력: string

// 조건, 명령어
// L : 커서를 왼쪽으로 => 맨 왼쪽이면 무시
// D : 커서를 오른쪽으로 => 맨 오른쪽이면 무시
// B : 커서 왼쪽에 있는 문자 삭제
// P $ : $ 문자를 커서 오른쪽에 추가

// 핵심
// 틀린 생각)
// 연결리스트로 구현된 stack을 사용해도 되지만 그냥 문자열 함수를 통해서 구현할 것임.
// 올바른 생각)
// 시간 복잡도 때문에 이중 연결리스트, stack 만 사용해야 함.



// [문제 세분화]
let str = input[0];
let n = input[1];
let arr = input.slice(2).map(x => x.split(" "));

function solution(str, n, arr) {
    // M. stack 2개 구현, 이걸로 cursor 구현
    let left = [...str];
    let right = [];

    // I. 명령어에 맞게 수행
    for (const [command, chr] of arr) {
        if (command === "L" && left.length) { // 꼭 좌, 우로 이동할 때 비어있으면 빼지 못하게 처리해줘야 함.
            right.push(left.pop());
        } else if (command === "D" && right.length) {
            left.push(right.pop());
        } else if (command === "B" && left.length) {
            left.pop();
        } else if (command === "P") {
            left.push(chr);
        }
    }
    return left.concat(right.reverse()).join("");
}

console.log(solution(str, n, arr));

// 틀린 구현, slice 는 O(n) 복잡도를 가짐 명령어 개수(500,000), 영문자 길이(100,000) 면 50,000,000,000
// 시간 복잡도에서 이미 컽
// function solution(str, n, arr) {
//     let answer = str;
//     // M. cursor 위치
//     let cursor = str.length;
//     // M. cursor 변경했을 때 range
//     const moveCursor = (index, length) => {
//         if (index < 0) return 0;
//         else if (index > length) return length;
//         return index;
//     };
//
//     // I. 명령어에 맞게 수행
//     for (const [command, chr] of arr) {
//         if (command === "L") { // I. 커서 왼쪽 이동
//             cursor = moveCursor(cursor - 1, answer.length);
//         } else if (command === "D") { // I. 커서 오른쪽 이동
//             cursor = moveCursor(cursor + 1, answer.length);
//         } else if (command === "B") { // I. 커서 왼쪽 문자 삭제
//             if (cursor - 1 >= 0) answer = answer.slice(0, cursor - 1) + answer.slice(cursor);
//             cursor = moveCursor(cursor - 1, answer.length);
//         } else if (command === "P") { // I. 커서 오른쪽에 문자 추가
//             answer = answer.slice(0, cursor) + chr + answer.slice(cursor);
//             cursor = moveCursor(cursor + 1, answer.length);
//         }
//     }
//
//     return answer;
// }
//
// console.log(solution(str, n, arr));