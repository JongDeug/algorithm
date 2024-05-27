import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 올바른 괄호 문자열인지 확인하는 함수를 구현해라.

// 입력: T(입력 데이터 수), arr(array of string, 괄호)
// 출력: array of strings(YES or NO)

// 핵심
// stack 을 어떻게 사용하지? 라는 의문이 들었는데
// ( 일때만 push, ) 일때는 빼면됨
// () 모두 stack에 들어갈 필요가 없다.

// [문제 세분화]
let t = input[0];
let arr = input.slice(1);

function solution(t, arr) {
    let answer = "";

    // M. 재귀 헬퍼 함수
    const valid = (str, stack = []) => {
        // Base Case : str 길이가 0일경우 => 재귀가 끝까지 돌았을 경우
        if (!str.length) {
            return stack.length === 0;
        }

        // I. ( 일 경우,
        if (str[0] === "(") stack.push(str[0]);
        // I. ) 일 경우,
        else if (str[0] === ")") {
            if (!stack.length) return false; // stack에 뺄게 없는 경우 짝이 맞지 않는다는 뜻.
            stack.pop();
        }

        return valid(str.slice(1), stack);
    };

    // I. arr 를 돌면서 YES, NO 넣기
    for (const item of arr) {
        if (valid(item)) answer += "YES\n";
        else answer += "NO\n";
    }

    return answer.slice(0, answer.length - 1);
}

console.log(solution(t, arr));
