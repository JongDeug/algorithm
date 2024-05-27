import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// 중위 표기식을 후위 표기식으로 변경하는 함수를 구현해라.

// 입력: string[alphabet, +, -, *, /, (, )]
// 출력: string(후위 표기식)

// [구체적인 예시]
// A * (B + C) / D => ABC+*D/
// 현재 문제 : 괄호 처리에서 splice 때문에 (B+C)/D가 모두 잘려 넘어가짐

// 핵심
// 1. stack과 recursion(재귀) 활용
// 2. 시간 제한은 2초라서 일단 ㄱㅊ 200,000,000

// [문제 세분화]
function solution(str) {
    let answer = "";
    let stack = [];
    // M. 연산자 우선순위 계산
    const priority = (operation) => {
        if (operation === "(") return 0;
        if (operation === "*" || operation === "/") return 2;
        if (operation === "+" || operation === "-") return 1;
    };

    // I. 문자열 array로 변경해서 반복
    [...str].forEach(chr => {
        // I. 알파벳
        if (chr >= "A" && chr <= "Z") answer += chr;
        // I. ')'
        else if (chr === ")") {
            // I. '(' 일 때 까지 뺌
            while (true) {
                const operation = stack.pop();
                if (operation === "(") break;
                else answer += operation;
            }
        }
        // I. '('
        else if (chr === "(") stack.push(chr);
        // I. 그 외 연산자
        else {
            // I. stack에 값이 있을 때 비교
            if (stack.length) {
                // I. stack에 있는 operation이랑 모두 비교해서 넣거나 빼기
                while(stack.length) {
                    const operation = stack.pop();
                    // I. chr이 우선 순위가 같거나 낮을 경우 들어가 있는 놈을 빼기
                    if (priority(chr) <= priority(operation)) answer += operation;
                    else {
                        // I. 우선순위가 높으면 다시 뺀값 넣기
                        stack.push(operation);
                        break;
                    }
                }
            }
            // I. stack에 값이 없거나, 있는데 우선 순위가 높을 경우 그냥 넣기
            stack.push(chr);
        }
    });

    // I. 마지막 stack에 있는 거 다빼기
    while (stack.length) {
        answer += stack.pop();
    }

    return answer;
}

console.log(solution(input));