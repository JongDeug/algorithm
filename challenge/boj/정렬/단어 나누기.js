import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim();

// [문제 이해하기]
// 단어를 하나 주는데 3부분으로 나눠서 각 부분을 뒤집은 다음 사전순으로 가장 앞서는 단어를 출력하는 함수를 구현해라.

// 입력: string
// 출력: string

// 핵심
// 1. 3파트로 나눌 때
//  1-1. 0 ~ i / i ~ j / j ~ length 로 나누면 됨

// [문제 세분화]
function solution(str) {
    let answer = [];
    // I. 3파트로 나눈다.
    for (let i = 1; i <= str.length - 2; i++) {
        for (let j = i + 1; j <= str.length - 1; j++) {
            let a = str.substring(0, i);
            let b = str.substring(i, j);
            let c = str.substring(j, str.length);

            // I. 뒤집는다
            a = a.split("").reverse().join("");
            b = b.split("").reverse().join("");
            c = c.split("").reverse().join("");

            answer.push(a+b+c);
        }
    }

    return answer.sort()[0];
}

console.log(solution(input));