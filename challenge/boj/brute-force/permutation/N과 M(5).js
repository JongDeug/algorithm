import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 중복 없는 순열, but 숫자는 주어진 것을 사용해야 함.

// 입력: N중 M, arr of integer(N)
// 출력: 중복 없는 순열

// [문제 세분화]
let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number).sort((a, b) => a - b);

function solution(n, m, arr) {
    let ans = [];
    let answer = "";

    const permutation = (list, tmp) => {
        if (tmp.length === m) {
            ans.push([...tmp]);
            return;
        }

        // I. list.length 인걸 명심
        for (let i = 0; i < list.length; i++) {
            const remain = list.filter((v, idx) => idx !== i);
            tmp.push(list[i]); //
            permutation(remain, tmp);
            tmp.pop();
        }
    };

    permutation(arr, []);
    ans.forEach(value => answer += `${value.join(" ")}\n`);
    return answer;
}

console.log(solution(n, m, arr));