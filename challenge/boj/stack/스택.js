import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 스택을 구현해라.

// 입력: N(명령의 수), arr(명령어)
// 출력: 명령에 맞는 int

// 명령, 조건
// push X: 정수 X를 스택에 넣는 연산이다.
// pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
// size: 스택에 들어있는 정수의 개수를 출력한다.
// empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
// top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.

// [문제 세분화]
let n = input[0];
let arr = input.slice(1).map(x => x.split(" "));

class Stack {
    constructor() {
        this.values = [];
    }

    // push, pop, size, empty, top
    push(x) {
        this.values.push(x);
    }

    pop() {
        if (!this.values.length) return -1;
        return this.values.pop();
    }

    size() {
        return this.values.length;
    }

    empty() {
        return this.values.length === 0 ? 1 : 0;
    }

    top() {
        if (!this.values.length) return -1;
        return this.values[this.size() - 1];
    }
}

function solution(n, arr) {
    let answer = "";
    // I. stack 을 만들어서 인스턴스로 활용
    let s = new Stack();

    // I. 조건에 맞게 구현
    for (const [command, num] of arr) {
        if (command === "push") {
            s.push(Number(num));
        } else if (command === "pop") {
            answer += `${s.pop()}\n`;
        } else if (command === "size") {
            answer += `${s.size()}\n`;
        } else if (command === "empty") {
            answer += `${s.empty()}\n`;
        } else if (command === "top") {
            answer += `${s.top()}\n`;
        }
    }
    return answer;
}

console.log(solution(n, arr));