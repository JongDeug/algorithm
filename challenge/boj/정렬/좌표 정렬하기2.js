import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 좌표를 정렬해라. y좌표 기준으로 정렬. 같으면 x좌표 기준. 정렬은 오름차순

// 입력: N(int), arr(x, y좌표 int)
// 출력: 정렬된 좌표

// [문제 세분화]
let n = input[0];
let arr = input.slice(1).map(x => x.split(" ").map(Number));

function solution(n, arr) {
    let answer = "";
    // I. 정렬
    arr.sort((a, b) => {
        let [x1, y1] = [a[0], a[1]];
        let [x2, y2] = [b[0], b[1]];

        if (y1 !== y2) return y1 - y2;
        else return x1 - x2;
    });

    for (const item of arr) {
        answer += `${item[0]} ${item[1]}\n`;
    }

    return answer.slice(0, answer.length - 1);
}

console.log(solution(n, arr));